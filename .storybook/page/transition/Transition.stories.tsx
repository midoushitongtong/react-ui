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
import { Transition, TransitionProps } from '../../../src/index';
import Button from '../../../src/components/button/Button';

export default {
  title: 'ReactUI/Transition',
  component: Transition,
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
export const Theme: Story<TransitionProps> = (args) => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setShow(!show)}>toggle</Button>
      <Transition in={show} animation="zoom-in-left" timeout={300}>
        <div>
          {new Array(15).fill(0).map(() => (
            <p>111</p>
          ))}
        </div>
      </Transition>

      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
        <Button type="primary">hello</Button>
      </Transition>
    </div>
  );
};
