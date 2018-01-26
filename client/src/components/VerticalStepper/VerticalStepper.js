import React from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './styles.css';

// TODOS: only show 'next' button when image has been uploaded
class VerticalStepper extends React.Component {
    state = {
        finished: false,
        stepIndex: 0
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

    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <div className="floatL">
                    <RaisedButton
                        label={stepIndex === 0 ? 'Select an Image' : 'Next'}
                        disableTouchRipple
                        disableFocusRipple
                        onClick={this.handleNext}
                        style={{ marginRight: 12 }}
                    />
                </div>
                <div className="clear" />
                <div>
                    <RaisedButton
                        label={stepIndex === 2 ? 'Finish' : 'Next'}
                        disableTouchRipple
                        disableFocusRipple
                        onClick={this.handleNext}
                        style={{ marginRight: 12 }}
                    />
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
        const { finished, stepIndex } = this.state;

        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Select campaign settings</StepLabel>
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
                                An ad group contains one or more ads which
                                target a shared set of keywords.
                            </p>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Categorize Your Item</StepLabel>
                        <StepContent>
                            <p className="step-explanation">
                                Try out different ad text to see what brings
                            </p>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Confirm Things</StepLabel>
                        <StepContent>
                            <p className="step-explanation">
                                Try out different ad text to see what brings
                            </p>
                            {this.renderStepActions(3)}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default VerticalStepper;
