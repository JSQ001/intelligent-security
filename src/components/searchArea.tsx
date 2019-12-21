import React, { ComponentType, MouseEvent, ReactNode } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Icon, Tooltip, Form, Input, Select, Col } from 'antd';
import Button from 'antd/es/button/button';
const FormItem = Form.Item;
const Option = Select.Option;

const initialState = {
  searchForm: [],
};
const defaultProps: DefaultProps = {
  props: {},
};

type State = Readonly<typeof initialState>;
type DefaultProps<P extends object = object> = { props: P };
type Props<P extends object = object> = Partial<
  {
    children: RenderCallback | ReactNode;
    render: RenderCallback;
    component: ComponentType<SearchAreaProps<P>>;
  } & DefaultProps<P>
>;

type RenderCallback = (args: SearchAreaProps) => JSX.Element;

export type SearchAreaProps<P extends object = object> = {
  searchForm: State['searchForm'];
} & P;

class SearchArea<T = {}> extends React.Component<Props<T>, State> {
  constructor(props: any) {
    super(props);
    console.log(props);
    this.state = {
      searchForm: this.props.searchForm,
    };
  }

  /* let handleEvent = (event: string, item: any) => {

  };*/
  //渲染搜索表单组件
  renderFormItem(item: any): any {
    let handle = () => {};

    switch (item.type) {
      //输入组件
      case 'input': {
        return (
          <Input
            placeholder={item.placeholder || formatMessage({ id: 'common.please.enter' })}
            onChange={handle}
            disabled={item.disabled}
          />
        );
      }
      //选择组件
      case 'select': {
        return (
          <Select
            placeholder={item.placeholder || formatMessage({ id: 'common.please.select' })}
            onChange={handle}
            allowClear
            disabled={item.disabled}
            labelInValue={!!item.entity}
            //onFocus={item.getUrl ? () => this.getOptions(item) : () => {}}
            //getPopupContainer={() => document.getElementById('search-area')}
          >
            {item.options.map((option: object) => {
              console.log(option);
              return (
                <Option
                  key={option.key}
                  title={option.data && !!item.entity ? JSON.stringify(option.data) : ''}
                >
                  {option.label}
                </Option>
              );
            })}
          </Select>
        );
      }
    }
  }

  getFields(fieldList: Array<any>): Array<any> {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {};
    const children = [];
    fieldList.map((item, index) => {
      children.push(
        <Col span={item.colSpan || 5} offset={index === 0 ? 0 : 1} key={item.id}>
          {item.type === 'items' ? (
            this.renderFormItem(item)
          ) : (
            <FormItem {...formItemLayout} label={item.label}>
              {getFieldDecorator(item.id, {
                valuePropName: item.type === 'switch' ? 'checked' : 'value',
                //initialValue: this.getDefaultValue(item),
                rules: [
                  {
                    required: item.isRequired,
                    message: formatMessage({ id: 'common.can.not.be.empty' }), //name 不可为空
                  },
                ],
              })(this.renderFormItem(item))}
            </FormItem>
          )}
        </Col>,
      );
    });
    return children;
  }

  render() {
    const { searchForm } = this.props;
    return (
      <div className={''}>
        <Form>
          {//renderForm()
          this.getFields(searchForm)}
          <Col span={5} offset={1} style={{ position: 'relative', top: 42 }}>
            <Button type="primary">查询</Button>
            <Button type="primary" style={{ marginLeft: 20 }}>
              添加/注册
            </Button>
          </Col>
        </Form>
      </div>
    );
  }
}

const WrappedSearchArea = Form.create({
  onValuesChange(props, values) {
    console.log(props);
    console.log(values);
  },
})(SearchArea);

export default connect((state: ConnectState) => {
  console.log(state);
  return {};
})(WrappedSearchArea);
