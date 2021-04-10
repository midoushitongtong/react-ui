import React from 'react';

type State = {
  position: {
    x: number;
    y: number;
  };
};

export type WithMousePositionProps = State;

const withMousePosition = <T extends State>(WrapComponent: React.ComponentType<T>) => {
  return class WithMousePosition extends React.Component<Partial<T>> {
    state: State = {
      position: {
        x: 0,
        y: 0,
      },
    };

    private updatePosition = (e: MouseEvent) => {
      this.setState({
        position: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };

    componentDidMount() {
      window.addEventListener('mousemove', this.updatePosition);
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.updatePosition);
    }

    render() {
      return <WrapComponent {...(this.props as T)} position={this.state.position} />;
    }
  };
};

export default withMousePosition;
