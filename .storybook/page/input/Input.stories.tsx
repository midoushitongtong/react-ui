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
import { Input, InputProps, Icon } from '../../../src/index';
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'ReactUI/Input',
  component: Input,
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
export const Default: Story<InputProps> = (args) => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Input
        {...args}
        defaultValue="123"
        placeholder="input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <p> {value}</p>
    </>
  );
};

// ==============================================================================================================================================================================================================================================
export const Icon2: Story<InputProps> = (args) => (
  <Input {...args} placeholder="input" icon={<Icon icon={faEdit} />} />
);
Icon2.storyName = 'Icon';

// ==============================================================================================================================================================================================================================================
export const PrependAndAppend: Story<InputProps> = (args) => (
  <>
    <Input {...args} placeholder="input" prepend="+" />
    <Input {...args} placeholder="input" append=".com" />
    <Input {...args} placeholder="input" prepend="+" append=".com" />
    <Input
      {...args}
      placeholder="input"
      prepend={<Icon icon={faUser} />}
      append={<Icon icon={faEdit} />}
    />
  </>
);
PrependAndAppend.storyName = 'Prepend And Append';

// ==============================================================================================================================================================================================================================================
export const Size: Story<InputProps> = (args) => (
  <>
    <Input {...args} placeholder="sm" size="sm" />
    <Input {...args} placeholder="default" />
    <Input {...args} placeholder="lg" size="lg" />
  </>
);
// ==============================================================================================================================================================================================================================================
export const Disable: Story<InputProps> = (args) => (
  <Input {...args} placeholder="disable" disabled />
);
