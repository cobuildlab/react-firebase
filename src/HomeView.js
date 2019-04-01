import React, { Component } from 'react';
import { Card, Media, Container, Row, Col, Badge, Button } from 'reactstrap';
import firebase from 'firebase';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  fetchTasks = () => {
    const DB = firebase.firestore();
    const tasksCollection = DB.collection('tasks');
    tasksCollection.get().then(query => {
      const tasks = [];
      query.forEach(doc => {
        tasks.push(doc.data());
      });
      this.setState({ tasks });
    });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  onCreateTask = () => {
    const DB = firebase.firestore();
    const tasksCollection = DB.collection('tasks');
    tasksCollection.add({
      text: this.state.text,
      time: new Date().toDateString(),
    }).then(() => this.fetchTasks());
  };

  render() {
    const { tasks } = this.state;

    return (
      <Container fluid>
        <Row className="mt-4">
          <Col className="home-text">Hello World with Firebase</Col>
          <Col md={12}>
            <h1> Tasks </h1>
            {tasks.map((task, i) => {
              return (
                <Card key={i}>
                  <Media heading className={'m-2'}>
                    {task.text}
                    <h6>
                      <Badge color="secondary">{task.time}</Badge>
                    </h6>
                  </Media>
                </Card>
              );
            })}
          </Col>
          <Col md={12}>
            <h7>Create new Task</h7>
            <br/>
            <input type={'text'} value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} />
            <br/>
            <Button onClick={this.onCreateTask}>
              Create
            </Button>
          </Col>
        </Row>
      </Container >
    );
  }
}

export default HomeView;
