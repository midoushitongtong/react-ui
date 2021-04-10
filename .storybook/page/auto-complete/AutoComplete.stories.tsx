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
import { AutoComplete, AutoCompleteProps, DataSourceItem } from '../../../src/index';

export default {
  title: 'ReactUI/AutoComplete',
  component: AutoComplete,
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
type ProductSelectItem = DataSourceItem & {
  amount: number;
};

const products: ProductSelectItem[] = [
  { value: '1', text: 'product1', amount: 1 },
  { value: '2', text: 'product2', amount: 1 },
  { value: '3', text: 'product3', amount: 1 },
  { value: '4', text: 'product4', amount: 1 },
  { value: '5', text: 'product5', amount: 1 },
];

export const Default: Story<AutoCompleteProps> = (args) => {
  const handleFetch = React.useCallback((keyword: string):
    | DataSourceItem[]
    | Promise<DataSourceItem[]> => {
    // return products.filter((item) => item.text.includes(keyword));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.filter((item) => item.text.includes(keyword)));
      }, 500);
    });
  }, []);

  const handleSelect = React.useCallback((value: string, item: ProductSelectItem) => {
    console.log(value, item);
  }, []);

  return (
    <AutoComplete
      {...args}
      placeholder="input"
      fetchSuggestions={handleFetch}
      onSelect={handleSelect}
    />
  );
};
