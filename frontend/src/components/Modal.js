import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      backendData: null,
      modalIsOpen: true, // Use state for modal open/close
    };
  }

  componentDidMount() {
    this.fetchDataFromBackend();
  }

  fetchDataFromBackend = () => {
    const apiUrl = 'https://your-django-app.onrender.com/api/';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required
      },
      // Add any other fetch options as needed
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.setState({ backendData: data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors more gracefully in a production environment
      });
  };

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={this.state.modalIsOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}> Task Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Task Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Task Description"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
          {this.state.backendData && (
            <div>
              <h3>Data from Backend:</h3>
              <pre>{JSON.stringify(this.state.backendData, null, 2)}</pre>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal;