import React from 'react';
import FlipMove from 'react-flip-move';
import './index.scss';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
};

class ReactImageUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
    };
    this.inputElement = '';
    this.onDropFile = this.onDropFile.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
  }

  /*
  Handle file validation
  */
  onDropFile(e) {
    const files = e.target.files;
    const _this = this;
    const newNotAcceptedTypeArray = [];
    const newNotAcceptedSizeArray = [];
    const pictures = [];
    // If callback giving, fire.
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(files);
    }
    // Iterate over all uploaded files
    for (let i = 0, f; f = files[i]; i++) { // eslint-disable-line
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        newNotAcceptedTypeArray.push(f.name);
        _this.setState({ notAcceptedFileType: newNotAcceptedTypeArray });
        continue;
      }
      // Check for file size
      if (f.size > this.props.maxFileSize) {
        newNotAcceptedSizeArray.push(f.name);
        _this.setState({ notAcceptedFileSize: newNotAcceptedSizeArray });
        continue;
      }

      const reader = new FileReader();
      // Read the image via FileReader API and save image result in state.
      reader.onload = (function (f) { // eslint-disable-line
        return function (e) { // eslint-disable-line
          pictures.push(e.target.result);
          _this.setState({ pictures });
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }

  /*
  Render the upload icon
  */
  renderIcon() { // eslint-disable-line
    if (this.props.withIcon) {
      return <div className="uploadIcon" />;
    }
  }

  /*
  Render label
  */
  renderLabel() { // eslint-disable-line
    if (this.props.withLabel) {
      return <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>;
    }
  }

  /*
  On button click, trigger input file to open
  */
  triggerFileUpload() {
    this.inputElement.value = '';
    this.inputElement.click();
  }

  /*
  Check file extension (onDropFile)
  */
  hasExtension(fileName) {
    return (new RegExp(`(${this.props.imgExtension.join('|').replace(/\./g, '\\.')})$`)).test(fileName);
  }

  /*
  Check if any errors && render
  */
  renderErrors() {
    let notAccepted = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map((error, index) => {
        return (
          <div className={`errorMessage${this.props.errorClass}`} key={index} style={this.props.errorStyle}>
            * {error} {this.props.fileTypeError}
          </div>
        );
      });
    }
    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
        return (
          <div className={`errorMessage${this.props.errorClass}`} key={index} style={this.props.errorStyle}>
            * {error} {this.props.fileSizeError}
          </div>
        );
      });
    }
    return notAccepted;
  }

  /*
  Render preview images
  */
  renderPreview() {
    return (
      <div className="uploadPicturesWrapper">
        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
          {this.renderPreviewPictures()}
        </FlipMove>
      </div>
    );
  }

  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return (
        <div key={index} className="uploadPictureContainer">
          <img src={picture} className="uploadPicture" alt="preview" />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="fileUploader" style={this.props.style}>
        <div className="fileContainer">
          {this.renderIcon()}
          {this.renderLabel()}
          <div className="errorsContainer">
            {this.renderErrors()}
          </div>
          <button
            className={`chooseFileButton ${this.props.buttonClassName}`}
            style={this.props.buttonStyles}
            onClick={this.triggerFileUpload}
          >{this.props.buttonText}
          </button>
          <input
            type="file"
            ref={(input) => { this.inputElement = input; }}
            name={this.props.name}
            multiple="multiple"
            onChange={this.onDropFile}
            accept={this.props.accept}
            className={this.props.className}
          />
          {this.props.withPreview ? this.renderPreview() : null}
        </div>
      </div>
    );
  }
}

ReactImageUploadComponent.defaultProps = {
  className: '',
  buttonClassName: {},
  buttonStyles: {},
  withPreview: false,
  accept: 'accept=image/*',
  name: '',
  withIcon: true,
  buttonText: 'Choose images',
  withLabel: true,
  label: 'Max file size: 5mb, accepted: jpg|gif|png|gif',
  labelStyles: {},
  labelClass: '',
  imgExtension: ['.jpg', '.gif', '.png', '.gif'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension',
  errorClass: '',
  style: {},
  errorStyle: {},
};

ReactImageUploadComponent.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  buttonClassName: React.PropTypes.object,
  buttonStyles: React.PropTypes.object,
  withPreview: React.PropTypes.bool,
  accept: React.PropTypes.string,
  name: React.PropTypes.string,
  withIcon: React.PropTypes.bool,
  buttonText: React.PropTypes.string,
  withLabel: React.PropTypes.bool,
  label: React.PropTypes.string,
  labelStyles: React.PropTypes.object,
  labelClass: React.PropTypes.string,
  imgExtension: React.PropTypes.array,
  maxFileSize: React.PropTypes.number,
  fileSizeError: React.PropTypes.string,
  fileTypeError: React.PropTypes.string,
  errorClass: React.PropTypes.string,
  errorStyle: React.PropTypes.object,
};
export default ReactImageUploadComponent;
