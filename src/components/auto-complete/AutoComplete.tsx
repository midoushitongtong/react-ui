import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import useDebounce from '../../hooks/useDebounce';
import Icon from '../icon/Icon';
import Input, { InputProps } from '../input/Input';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../transition/Transition';
import './AutoComplete.css';

type DataSourceItemObject = {
  value: string;
  text: string;
};

export type DataSourceItem = DataSourceItemObject;

type OwnProps = {
  // 获取自动补全下拉列表(返回的是联合类型)
  fetchSuggestions: (keyword: string) => DataSourceItem[] | Promise<DataSourceItem[]>;
  // 选择了某个下拉
  onSelect?: (value: string, item: DataSourceItem & any) => void;
  // 自定义渲染下拉
  renderSelectOption?: (string: string, item: DataSourceItem & any) => JSX.Element;
};

// 移除 "onSelect" 属性, 防止和 OwnProps 冲突
export type AutoCompleteProps = OwnProps & Omit<InputProps, 'onSelect'>;

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderSelectOption, ...resetProps } = props;

  // input 表单值
  const [value, setValue] = React.useState(props.value);
  // 更新下拉列表 loading
  const [fetchLoading, setFetchLoading] = React.useState(false);
  // 是否显示下拉列表
  const [showDropdown, setShowDropdown] = React.useState(false);
  // 下拉列表
  const [suggestions, setSuggestions] = React.useState<DataSourceItem[]>([]);
  // 防抖处理
  const debounceValue = useDebounce(value);
  // 高亮 index
  const [highlightIndex, setHighlightIndex] = React.useState(-1);
  // 当前是否可以刷新下拉列表
  const triggerFetchSugestion = React.useRef(false);
  // 组件 ref
  const componentRef = React.useRef<HTMLDivElement>(null);

  // 点击了组件外的地方, 清空下拉列表
  const handleClickOutSide = React.useCallback(() => {
    setShowDropdown(false);
  }, []);
  useClickOutside(componentRef, handleClickOutSide);

  // 监听 debounceValue 值, 刷新下拉列表
  React.useEffect(() => {
    // 重置高亮 index
    setHighlightIndex(-1);

    if (triggerFetchSugestion.current && debounceValue && typeof debounceValue === 'string') {
      console.log('trigger');

      // input 有值, 更新下拉列表
      const results = fetchSuggestions(debounceValue);

      if (results instanceof Promise) {
        setFetchLoading(true);
        results
          .then((data) => {
            setSuggestions(data);
            if (data.length > 0) {
              // 有数据, 显示下拉列表
              setShowDropdown(true);
            }
          })
          .finally(() => {
            setFetchLoading(false);
          });
      } else {
        setSuggestions(results);
        if (results.length > 0) {
          // 有数据, 显示下拉列表
          setShowDropdown(true);
        }
      }
    } else {
      // input 无值, 隐藏下拉菜单
      setShowDropdown(false);
    }
  }, [debounceValue, fetchSuggestions]);

  // 更新 input 值
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    triggerFetchSugestion.current = true;

    setValue(value);
  }, []);

  // 修改高亮 index
  const highlight = React.useCallback(
    (index: number) => {
      if (index < 0) {
        index = suggestions.length - 1;
      }

      if (index > suggestions.length - 1) {
        index = 0;
      }

      setHighlightIndex(index);
    },
    [suggestions]
  );

  // select 某个下拉项
  const handleSelect = React.useCallback(
    (item: DataSourceItem) => {
      triggerFetchSugestion.current = false;

      setValue(item.text);

      setShowDropdown(false);

      if (onSelect) {
        onSelect(item.value, item);
      }
    },
    [setValue, setShowDropdown, onSelect]
  );

  // 监听键盘 ↑, ↓, 回车, ESC 更新所选高亮
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowUp':
          highlight(highlightIndex - 1);
          break;
        case 'ArrowDown':
          highlight(highlightIndex + 1);
          break;
        case 'Enter':
          if (suggestions[highlightIndex]) {
            handleSelect(suggestions[highlightIndex]);
          }
          break;
        case 'Escape':
          setShowDropdown(false);
          break;
        default:
          break;
      }
    },
    [suggestions, highlightIndex, highlight, handleSelect]
  );

  // 生成下拉列表项
  const generateSelectOption = React.useCallback(
    (item: DataSourceItem) => {
      // props 有传就用 props 的方法, 没有就默认
      return renderSelectOption ? renderSelectOption(item.text, item) : item.text;
    },
    [renderSelectOption]
  );

  // 生成下拉列表
  const generateDropdown = React.useCallback(() => {
    return (
      <Transition
        in={showDropdown}
        timeout={300}
        animation="zoom-in-top"
        onExited={() => setSuggestions([])}>
        {suggestions.length > 0 ? (
          <ul className="dropdown-list">
            {suggestions.map((item, index) => {
              const classes = classNames('dropdown-list-item', {
                highlight: index === highlightIndex,
              });
              return (
                <li key={index} className={classes} onClick={() => handleSelect(item)}>
                  {generateSelectOption(item)}
                </li>
              );
            })}
          </ul>
        ) : (
          <div></div>
        )}
      </Transition>
    );
  }, [showDropdown, suggestions, highlightIndex, handleSelect, generateSelectOption]);

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        {...resetProps}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        icon={fetchLoading ? <Icon icon={faSpinner} spin /> : null}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
