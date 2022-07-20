import validatePermission from 'utils/validatePermission';
import permissionAuth from 'utils/permissionAuth';

export default (permissions=[]) => {
  return [
    validatePermission(permissions, [
      'and',
      [
        permissionAuth.GET_DAILY_REPORT,
        permissionAuth.GET_WEEKLY_REPORT,
        permissionAuth.GET_AGENT_REPORT,
        permissionAuth.GET_TEAM_CHAT_REPORT,
        permissionAuth.VIEW_ALL_PUNCH_DATA
      ],
      [
        permissionAuth.VIEW_ALL_DEPARTMENT,
      ],
      [
        permissionAuth.VIEW_AGENTS_OF_DEPARTMENT,
      ]
    ]) ? null :
      {
        title: 'EXPORT',
        href: '/export',
        children: [
          {
            title: 'PANEL',
            href: '/export/panel'
          },
          {
            title: 'TRACKING',
            href: '/export/tracking'
          }
        ]
      },

    validatePermission(permissions, [
      permissionAuth.VALIDATE_DATA,
      permissionAuth.IMPORT_DATA]
    ) ? null :
      {
        title: 'IMPORT',
        href: '/import/panel',
        // children: [
        //   {
        //     title: 'PANEL',
        //     href: '/import/panel'
        //   },
        //   {
        //     title: 'TRACKING',
        //     href: '/import/tracking'
        //   }
        // ]
      },

    validatePermission(permissions, [
      'and',
      [
        permissionAuth.VIEW_ALL_GLIP_DATA,
        permissionAuth.VIEW_ALL_EMAIL_DATA,
        permissionAuth.VIEW_ALL_EPIC_DATA,
        permissionAuth.VIEW_ALL_PHONE_DATA,
        permissionAuth.VIEW_ALL_INBOUND_CALL_DATA,
        permissionAuth.VIEW_ALL_PUNCH_DATA
      ],
      [
        permissionAuth.VIEW_ALL_DEPARTMENT,
      ],
      [
        permissionAuth.VIEW_AGENTS_OF_DEPARTMENT,
      ]
    ]) ? null :
      {
        title: 'DATA CENTER',
        href: '/data-center',
      },

    validatePermission(permissions, [permissionAuth.VIEW_ACTIVITY_LOG]) ? null :
      {
        title: 'LOG',
        href: '/log',
      },

    validatePermission(permissions, [
      'or',
      [permissionAuth.MANAGE_CONFIGURATION, permissionAuth.VIEW_ALL_DEPARTMENT, permissionAuth.VIEW_AGENTS_OF_DEPARTMENT],
      [permissionAuth.MANAGE_CONFIGURATION, permissionAuth.VIEW_ALL_AGENT, permissionAuth.VIEW_DEPARTMENTS_OF_AGENT],
      [permissionAuth.MANAGE_CONFIGURATION, permissionAuth.VIEW_ALL_EMAIL_TEAM],
      [permissionAuth.MANAGE_CONFIGURATION, permissionAuth.VIEW_ALL_LOGIC],
    ]) ? null :
      {
        title: 'CONFIGURATION',
        href: '/configuration',
      },

  ].filter(element => element !== null);
};
