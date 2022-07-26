import React, { useEffect } from 'react';
import './FileInput.css';
import PropTypes from 'prop-types';

const FileInput = (props) => {
  // eslint-disable-next-line
  const { className, style, accept, handleChooseFile, ...rest } = props;

  const onChange = (event) => {
    const files = event.target.files;

    let listFile = [];
    let filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function(f) {
      listFile.push(f);
    });

    handleChooseFile(listFile);
  };

  useEffect(() => {
    let inputs = document.querySelectorAll('.inputFile');

    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.nextElementSibling;
      let labelVal = label.innerHTML;

      input.addEventListener('change', function (e) {
        let fileName = '';
        if (this.files && this.files.length > 1)
          fileName = (this.getAttribute('data-multiple-caption') || '').replace(
            '{count}',
            this.files.length,
          );
        else fileName = e.target.value.split('\n').pop();

        if (fileName) label.querySelector('span').innerHTML = fileName;
        else label.innerHTML = labelVal;
      });
    });

  }, []);

  return (
    <div>
      <input
        accept={accept}
        className="inputFile"
        data-multiple-caption="{count} files selected"
        id="file"
        multiple
        name="file"
        onChange={(event) => onChange(event)}
        type="file"
      />
      <label
        className={className}
        htmlFor="file"
        style={style}
      >
        <svg
          fill="white"
          height="17"
          viewBox="0 0 20 17"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
        </svg>
        <span style={{margin:'0px 5px'}}>Choose files&hellip;</span>
      </label>
    </div>
  );
};

FileInput.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  handleChooseFile: PropTypes.func,
  style: PropTypes.object,
};

export default FileInput;
