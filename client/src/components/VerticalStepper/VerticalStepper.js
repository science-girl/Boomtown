import React from 'react';
import firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { connect } from 'react-redux';
import {
    updateImageField,
    updateTitleField,
    updateDescriptionField,
    toggleImageSelected,
    toggleCategorySelected,
    resetFields
} from '../../redux/modules/share';
import ValidatedTextField from '../ValidatedTextField';
import Filter from '../Filter/FilterSelection';
import './styles.css';
import { firebaseAuth } from '../../config/firebaseConfig';

// TODO: only show 'next' button when image has been uploaded
class VerticalStepper extends React.Component {
    constructor() {
        super();
        this.state = {
            finished: false,
            stepIndex: 0
        };
        this.submitForm = this.submitForm.bind(this);
    }

    // Handlers for custom functionality
    // https://time2hack.com/2017/10/upload-files-to-firebase-storage-with-javascript/

    openFileDialog = () => document.getElementById('image').click();

    uploadFile = input => {
        // create firebase storage reference
        const ref = firebase.storage().ref();
        // get the file to be uploaded from the input[type="file"]
        const file = input.target.files[0];
        const name = `${+new Date()}-${file.name}`;
        const metadata = {
            contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task
            .then(snapshot => {
                const url = snapshot.downloadURL;
                console.log(url);
                // set the url in the redux storage
                this.props.updateImageField(url);
                // let the user proceed to the Next step
                this.props.toggleImageSelected(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    submitForm = async (
        title,
        description,
        itemowner,
        imageurl,
        { tagList }
    ) => {
        // format tags from an array of IDs to [{id: x}, ... {id: y}]
        const tags = [];
        tagList.forEach(tag => tags.push({ id: tag }));
        console.log(`in submit ${title} ${description}`);
        await this.props
            .mutate({
                variables: {
                    title,
                    description,
                    itemowner,
                    imageurl,
                    tags
                }
            })
            .then(({ data }) => {
                console.log('got data', data);
                // reset title, description, image fields
                this.props.reset();
                // direct user to items page
                this.props.history.push('/items');
            })
            .catch(error => {
                console.log(
                    'there was an error sending the query',
                    error.message
                );
            });
    };

    handleUpdateTitle = ({ target: { value } }) => {
        this.props.updateTitle(value);
    };

    handleUpdateDescription = ({ target: { value } }) => {
        this.props.updateDescription(value);
    };

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    renderStepActions(step, title, description, tagList, imageUrl) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <div className="floatL">
                    {step === 0 && (
                        <RaisedButton
                            label={'Select an Image'}
                            disableTouchRipple
                            disableFocusRipple
                            onClick={this.openFileDialog}
                            style={{ marginRight: 12 }}
                        >
                            <div className="hidden">
                                {' '}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={this.uploadFile}
                                    hidden
                                    id="image"
                                />
                            </div>
                        </RaisedButton>
                    )}
                </div>
                <div className="clear" />
                <div>
                    {step < 2 && (
                        <RaisedButton
                            label={'Next'}
                            disabled={this.props.imgSelect}
                            disableTouchRipple
                            disableFocusRipple
                            onClick={this.handleNext}
                            style={{ marginRight: 12 }}
                        />
                    )}
                    {step === 2 && (
                        <RaisedButton
                            label={'Next'}
                            disabled={this.props.tagList.length === 0}
                            disableTouchRipple
                            disableFocusRipple
                            onClick={this.handleNext}
                            style={{ marginRight: 12 }}
                        />
                    )}
                    {step === 3 && (
                        <RaisedButton
                            label="Confirm"
                            disableTouchRipple
                            disableFocusRipple
                            onClick={() =>
                                this.submitForm(
                                    `${title}`,
                                    `${description}`,
                                    `${firebaseAuth.currentUser.uid}`,
                                    `${imageUrl}`,
                                    { tagList }
                                )
                            }
                            style={{ marginRight: 12 }}
                        />
                    )}
                </div>
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple
                        disableFocusRipple
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const { stepIndex } = this.state;

        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Add an Image</StepLabel>
                        <StepContent>
                            <p className="step-explanation">
                                We live in a visual culture. Upload a picture
                                for your item!
                            </p>

                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Add a Title & Description</StepLabel>
                        <StepContent>
                            <p className="step-explanation">
                                Tell the world about your item!
                            </p>
                            <ValidatedTextField
                                label="Title"
                                hintText="title"
                                handleChange={this.handleUpdateTitle}
                            />
                            <ValidatedTextField
                                label="Description"
                                hintText="description"
                                handleChange={this.handleUpdateDescription}
                            />
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Categorize Your Item</StepLabel>
                        <StepContent>
                            <p className="step-explanation">
                                Now put your item in a categorical box.
                            </p>
                            <Filter />
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Confirm Things</StepLabel>
                        <StepContent>
                            <p className="step-explanation">
                                If you are happy and you are ready to share,
                                give the confirm button a smash.
                            </p>
                            {this.renderStepActions(
                                3,
                                this.props.titleText,
                                this.props.descriptionText,
                                this.props.tagList,
                                this.props.imageUrl
                            )}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    titleText: state.share.titleText,
    descriptionText: state.share.descriptionText,
    imageUrl: state.share.imageUrl,
    tagList: state.items.tagList,
    imgSelect: state.share.imageSelected
});
const mapDispatchToProps = dispatch => ({
    updateTitle: text => {
        dispatch(updateTitleField(text));
    },
    updateDescription: text => {
        dispatch(updateDescriptionField(text));
    },
    updateImageField: imageUrl => {
        dispatch(updateImageField(imageUrl));
    },
    toggleImageSelected: onOrOff => {
        dispatch(toggleImageSelected(onOrOff));
    },
    toggleCategorySelected: onOrOff => {
        dispatch(toggleCategorySelected(onOrOff));
    },
    reset: () => {
        dispatch(resetFields());
    }
});

const addItem = gql`
    mutation addItem(
        $title: String
        $description: String
        $imageurl: String
        $itemowner: ID
        $tags: [TagInput]
    ) {
        addItem(
            newItem: {
                title: $title
                description: $description
                imageurl: $imageurl
                itemowner: $itemowner
                tags: $tags
            }
        ) {
            created
            id
        }
    }
`;

export default compose(
    graphql(addItem),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(VerticalStepper));
