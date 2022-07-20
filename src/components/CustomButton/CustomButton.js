import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@material-ui/core';

const greenBright = '#2ae437';
const green = '#008000';
const greenDark = '#075207';

const blueBright = '#2f3fdc';
const blue = '#3f51b5';
const blueDark = '#1a237e';

const orangeBright = '#ff7f33';
const orange = '#dc6f2e';
const orangeDark = '#ad5724';

const redBright = '#ef3232';
const red = '#d10000';
const redDark = '#ab0000';

const grayBright = '#a9a9a9';
const gray = '#6c6c6c';
const grayDark = '#4b4b4b';

const white = '#ffffff';

const black = '#000000'


const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: '80px',
    minHeight: '35px',
    // textTransform: 'capitalize',
    textTransform: 'inherit',
    cursor: 'pointer',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: `6px ${theme.spacing(2)}px`,
    '&:disabled': {
      opacity: '.3',
      cursor: 'not-allowed',
      transition: 'background-color 9999999s, color 9999999s',
      pointerEvents: 'unset'
    }
  },

  greenBright: {
    color: greenBright,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: greenBright,
      border: `1px solid ${greenBright}`,
    }
  },
  green: {
    color: green,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: green,
      border: `1px solid ${green}`,
    }
  },
  greenDark: {
    color: greenDark,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: greenDark,
      border: `1px solid ${greenDark}`,
    }
  },
  greenFullBright: {
    color: white,
    backgroundColor: greenBright,
    border: `1px solid ${greenBright}`,
    '&:hover': {
      color: white,
      backgroundColor: green,
      border: `1px solid ${green}`,
    }
  },
  greenFull: {
    color: white,
    backgroundColor: green,
    border: `1px solid ${green}`,
    '&:hover': {
      color: white,
      backgroundColor: greenDark,
      border: `1px solid ${greenDark}`,
    }
  },
  greenFullDark: {
    color: white,
    backgroundColor: greenDark,
    border: `1px solid ${greenDark}`,
    '&:hover': {
      color: white,
      backgroundColor: green,
      border: `1px solid ${green}`,
    }
  },

  blueBright: {
    color: blueBright,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: blueBright,
      border: `1px solid ${blueBright}`,
    }
  },
  blue: {
    color: blue,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: blue,
      border: `1px solid ${blue}`,
    }
  },
  blueDark: {
    color: blueDark,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: blueDark,
      border: `1px solid ${blueDark}`,
    }
  },
  blueFullBright: {
    color: white,
    backgroundColor: blueBright,
    border: `1px solid ${blueBright}`,
    '&:hover': {
      color: white,
      backgroundColor: blue,
      border: `1px solid ${blue}`,
    }
  },
  blueFull: {
    color: white,
    backgroundColor: blue,
    border: `1px solid ${blue}`,
    '&:hover': {
      color: white,
      backgroundColor: blueDark,
      border: `1px solid ${blueDark}`,
    }
  },
  blueFullDark: {
    color: white,
    backgroundColor: blueDark,
    border: `1px solid ${blueDark}`,
    '&:hover': {
      color: white,
      backgroundColor: blue,
      border: `1px solid ${blue}`,
    }
  },
  
  orangeBright: {
    color: orangeBright,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: orangeBright,
      border: `1px solid ${orangeBright}`,
    }
  },
  orange: {
    color: orange,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: orange,
      border: `1px solid ${orange}`,
    }
  },
  orangeDark: {
    color: orangeDark,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: orangeDark,
      border: `1px solid ${orangeDark}`,
    }
  },
  orangeFullBright: {
    color: white,
    backgroundColor: orangeBright,
    border: `1px solid ${orangeBright}`,
    '&:hover': {
      color: white,
      backgroundColor: orange,
      border: `1px solid ${orange}`,
    }
  },
  orangeFull: {
    color: white,
    backgroundColor: orange,
    border: `1px solid ${orange}`,
    '&:hover': {
      color: white,
      backgroundColor: orangeDark,
      border: `1px solid ${orangeDark}`,
    }
  },
  orangeFullDark: {
    color: white,
    backgroundColor: orangeDark,
    border: `1px solid ${orangeDark}`,
    '&:hover': {
      color: white,
      backgroundColor: orange,
      border: `1px solid ${orange}`,
    }
  },

  redBright: {
    color: redBright,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: redBright,
      border: `1px solid ${redBright}`,
    }
  },
  red: {
    color: red,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: red,
      border: `1px solid ${red}`,
    }
  },
  redDark: {
    color: redDark,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: redDark,
      border: `1px solid ${redDark}`,
    }
  },
  redFullBright: {
    color: white,
    backgroundColor: redBright,
    border: `1px solid ${redBright}`,
    '&:hover': {
      color: white,
      backgroundColor: red,
      border: `1px solid ${red}`,
    }
  },
  redFull: {
    color: white,
    backgroundColor: red,
    border: `1px solid ${red}`,
    '&:hover': {
      color: white,
      backgroundColor: redDark,
      border: `1px solid ${redDark}`,
    }
  },
  redFullDark: {
    color: white,
    backgroundColor: redDark,
    border: `1px solid ${redDark}`,
    '&:hover': {
      color: white,
      backgroundColor: red,
      border: `1px solid ${red}`,
    }
  },
  
  grayBright: {
    color: grayBright,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: grayBright,
      border: `1px solid ${grayBright}`,
    }
  },
  gray: {
    color: gray,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: gray,
      border: `1px solid ${gray}`,
    }
  },
  grayDark: {
    color: grayDark,
    backgroundColor: white,
    border: '1px solid currentColor',
    '&:hover': {
      color: white,
      backgroundColor: grayDark,
      border: `1px solid ${grayDark}`,
    }
  },
  grayFullBright: {
    color: white,
    backgroundColor: grayBright,
    border: `1px solid ${grayBright}`,
    '&:hover': {
      color: white,
      backgroundColor: gray,
      border: `1px solid ${gray}`,
    }
  },
  grayFull: {
    color: white,
    backgroundColor: gray,
    border: `1px solid ${gray}`,
    '&:hover': {
      color: white,
      backgroundColor: grayDark,
      border: `1px solid ${grayDark}`,
    }
  },
  grayFullDark: {
    color: white,
    backgroundColor: grayDark,
    border: `1px solid ${grayDark}`,
    '&:hover': {
      color: white,
      backgroundColor: gray,
      border: `1px solid ${gray}`,
    }
  },
  
  default: {
    color: black,
    backgroundColor: white,
    border: `1px solid ${black}`,
    '&:hover': {
      color: white,
      backgroundColor: gray,
      border: `1px solid ${gray}`,
    }
  },
}));


const CustomButton = (props) => {
  // eslint-disable-next-line
  const { className, style, type, children, content, onClick, onChange, disabled, ...rest } = props;
  //* type in [add, update, delete, cancel, confirm, import, back, next, check, remove, detail, upload]

  const classes = useStyles();

  return (
    <Button
      // variant="contained"
      className={clsx(
        type === 'green-bright' ? classes.greenBright :
          type === 'green' ? classes.green :
            type === 'green-dark' ? classes.greenDark :
              type === 'green-full-bright' ? classes.greenFullBright :
                type === 'green-full' ? classes.greenFull :
                  type === 'green-full-dark' ? classes.greenFullDark :
                    type === 'blue-bright' ? classes.blueBright :
                      type === 'blue' ? classes.blue :
                        type === 'blue-dark' ? classes.blueDark :
                          type === 'blue-full-bright' ? classes.blueFullBright :
                            type === 'blue-full' ? classes.blueFull :
                              type === 'blue-full-dark' ? classes.blueFullDark :
                                type === 'orange-bright' ? classes.orangeBright :
                                  type === 'orange' ? classes.orange :
                                    type === 'orange-dark' ? classes.orangeDark :
                                      type === 'orange-full-bright' ? classes.orangeFullBright :
                                        type === 'orange-full' ? classes.orangeFull :
                                          type === 'orange-full-dark' ? classes.orangeFullDark :
                                            type === 'red-bright' ? classes.redBright :
                                              type === 'red' ? classes.red :
                                                type === 'red-dark' ? classes.redDark :
                                                  type === 'red-full-bright' ? classes.redFullBright :
                                                    type === 'red-full' ? classes.redFull :
                                                      type === 'red-full-dark' ? classes.redFullDark :
                                                        type === 'gray-bright' ? classes.grayBright :
                                                          type === 'gray' ? classes.gray :
                                                            type === 'gray-dark' ? classes.grayDark :
                                                              type === 'gray-full-bright' ? classes.grayFullBright :
                                                                type === 'gray-full' ? classes.grayFull :
                                                                  type === 'gray-full-dark' ? classes.grayFullDark : classes.default,
        classes.button)}
      disabled={disabled}
      onChange={(event) => onChange(event)}
      onClick={onClick}
      style={style}
      type={type === 'import' ? 'file' : 'button'}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {children}
        <div className={classes.span}>{content}</div>
      </div>
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  content: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default CustomButton;
