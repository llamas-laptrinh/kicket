import React, { Component } from "react";

export default class classCompnent extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
    // step 1
  }
  componentDidMount(): void {
    // step 3
  }

  shouldComponentUpdate(
    nextProps: Readonly<{}>,
    nextState: Readonly<{}>,
    nextContext: any
  ): boolean {
    return false
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log("After update");
    
  }
  render() {
    // step 2
    return <div>classCompnent</div>;
  }
}
