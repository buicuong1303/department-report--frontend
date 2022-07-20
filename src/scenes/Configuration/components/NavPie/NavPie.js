import React from 'react';
import PropTypes from 'prop-types';
import './NavPie.scss';
import { ContactMail, Extension, Group, Person } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

const NavPie = props => {
  // eslint-disable-next-line
  const { active, canViewAgent, canViewDepartment, canViewEmailTeam, canViewLogic, setActive, ...rest } = props;

  // const classes = useStyle();
  const [value, setValue] = React.useState(false);
  const handleChange = () => {
    setValue(!value);
  };

  return (
    <nav className="menu">
      <input
        checked={value}
        className="menu-open"
        href="#"
        id="menu-open"
        name="menu-open"
        onChange={() => handleChange()}
        type="checkbox"
      />
      <label
        className="menu-open-button"
        htmlFor="menu-open"
      >
        <span className="hamburger hamburger-1" />
        <span className="hamburger hamburger-2" />
        <span className="hamburger hamburger-3" />
      </label>

      {
        canViewDepartment && <Tooltip
          placement="right"
          title="Department"
        >
          <button
            className={
              active === 'departments'
                ? 'menu-item menu-item-active'
                : 'menu-item'
            }
            onClick={() => setActive('departments')}
          >
            <Group style={{ width: '30px', height: '30px' }} />
          </button>
        </Tooltip>
      }

      {
        canViewAgent && <Tooltip
          placement="right"
          title="Agent"
        >
          <button
            className={
              active === 'agents' ? 'menu-item menu-item-active' : 'menu-item'
            }
            onClick={() => setActive('agents')}
          >
            <Person style={{ width: '30px', height: '30px' }} />
          </button>
        </Tooltip>
      }

      {
        canViewEmailTeam && <Tooltip
          placement="right"
          title="Email"
        >
          <button
            className={
              active === 'emailTeams' ? 'menu-item menu-item-active' : 'menu-item'
            }
            onClick={() => setActive('emailTeams')}
          >
            <ContactMail style={{ width: '30px', height: '30px' }} />
          </button>
        </Tooltip>
      }

      {
        canViewLogic && <Tooltip
          placement="right"
          title="Config"
        >
          <button
            className={
              active === 'logics' ? 'menu-item menu-item-active' : 'menu-item'
            }
            onClick={() => setActive('logics')}
          >
            <Extension style={{ width: '30px', height: '30px' }} />
          </button>
        </Tooltip>
      }
    </nav>
  );

};

NavPie.propTypes = {
  active: PropTypes.string,
  canViewAgent: PropTypes.bool,
  canViewDepartment: PropTypes.bool,
  canViewEmailTeam: PropTypes.bool,
  canViewLogic: PropTypes.bool,
  setActive: PropTypes.func.isRequired
};

export default NavPie;
