import * as React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Props,
} from '@storybook/addon-docs/blocks';
import { Icon, IconProps, IconThemeProps } from '../../../src/index';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'ReactUI/Icon',
  component: Icon,
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
          <Props />
        </>
      ),
    },
  },
} as Meta;

// ==============================================================================================================================================================================================================================================
export const Theme: Story<IconProps> = (args) => {
  const themes: IconThemeProps[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ];

  return (
    <div>
      {themes.map((item) => (
        <div key={item}>
          <Icon {...args} icon={faPlus} theme={item} />
          <Icon {...args} icon={faTrash} theme={item} />
          <Icon {...args} icon={faEdit} theme={item} />
          <hr />
        </div>
      ))}
    </div>
  );
};

// ==============================================================================================================================================================================================================================================
export const Size: Story<IconProps> = (args) => {
  const themes: IconThemeProps[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ];

  return (
    <div>
      {themes.map((item) => (
        <div key={item}>
          <Icon {...args} icon={faPlus} theme={item} size="3x" style={{ marginRight: '15px' }} />
          <Icon {...args} icon={faTrash} theme={item} size="3x" style={{ marginRight: '15px' }} />
          <Icon {...args} icon={faEdit} theme={item} size="3x" style={{ marginRight: '15px' }} />
          <hr />
        </div>
      ))}
    </div>
  );
};
