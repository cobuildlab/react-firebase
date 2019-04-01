import React from 'react';
import Sidebar from '../../components/NavigationBar';
import { Container, Row, Col, Button } from 'reactstrap';
//Icons
import { QUESTIONS } from './profile-models';
import * as R from 'ramda';
import Radio from '../../components/form/Radio';
import { fetchProfileAction, updateProfileAction } from './profile-actions';
import View from 'react-flux-state';
import {
  PROFILE_ERROR_EVENT,
  PROFILE_EVENT,
  profileStore,
  UPDATE_PROFILE_EVENT,
} from './profile-store';
import { onErrorMixin } from '../../shared/mixins';
import { toast } from 'react-toastify';

/**
 * Edit Profile View
 */
class EditProfileView extends View {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: R.clone(QUESTIONS),
    };
    this.onError = onErrorMixin.bind(this);
  }

  componentDidMount() {
    this.subscribe(profileStore, PROFILE_ERROR_EVENT, this.onError);
    this.subscribe(profileStore, UPDATE_PROFILE_EVENT, () => {
      toast.success('Profile successfully Updated!');
      this.props.history.push('/my-profile');
    });
    this.subscribe(profileStore, PROFILE_EVENT, (state) => {
      const { data } = this.state;
      data.forEach((optionSet) => {
        const questions = optionSet.options;
        questions.forEach((question) => {
          const currentValue = state[question.id];
          question.values.forEach((value) => {
            if (value.name === currentValue) value.checked = true;
          });
        });
      });
      this.setState({ data });
    });
    fetchProfileAction();
  }

  toggleQuestion = (valueIndex, optionsIndex, questionIndex) => {
    const { data } = this.state;
    const question = data[optionsIndex].options[questionIndex];
    question.values.forEach((value, i) => (value.checked = i === valueIndex));
    data[optionsIndex][questionIndex] = question;
    this.setState({ data });
  };

  onSubmit = () => {
    const { data } = this.state;
    const profileData = {};
    data.forEach(({ options }) => {
      options.forEach((question) => {
        const checked = question.values.find((val) => val.checked === true);
        if (checked) profileData[question.id] = checked.name;
      });
    });
    updateProfileAction(profileData);
  };

  onCancel = () => this.props.history.goBack();

  render() {
    const { data } = this.state;
    return (
      <Sidebar currentRoute={'/my-profile'}>
        <Container fluid className="mt-3">
          <Row className="m-4 item-content">
            <Col>
              <h4 className="d-inline">Update Initial Assessment</h4>
              <div className="d-flex pb-4 float-right">
                <Button className="ml-4 btn btn-primary btn-block pl-4pr-4" onClick={this.onSubmit}>
                  Save
                </Button>
                <Button className="ml-4 btn btn-primary btn-block pl-4pr-4" onClick={this.onCancel}>
                  Cancel
                </Button>
              </div>
              <Row className="mt-5">
                {data.map(({ options }, optionsIndex) => {
                  return (
                    <Col className="profile-content" key={optionsIndex}>
                      {options.map((option, questionIndex) => {
                        return (
                          <React.Fragment key={questionIndex}>
                            <strong className="item-textgray-small">{option.title}</strong>
                            <p>
                              {option.values.map((value, valueIndex) => {
                                return (
                                  <React.Fragment key={valueIndex}>
                                    <Radio
                                      checked={value.checked}
                                      onClick={() =>
                                        this.toggleQuestion(valueIndex, optionsIndex, questionIndex)
                                      }
                                    />
                                    <small key={valueIndex}>{value.name}</small>
                                    <br />
                                  </React.Fragment>
                                );
                              })}
                            </p>
                          </React.Fragment>
                        );
                      })}
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </Sidebar>
    );
  }
}

export default EditProfileView;
