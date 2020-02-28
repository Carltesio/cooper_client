import React, { Component } from 'react';
import { getData } from "../modules/performanceData";

class DisplayPerformanceData extends Component {
    state = { 
        performanceData: null 
    }

    componentDidMount() {
        this.getPerformanceData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.updateIndex !== prevProps.updateIndex){
            this.getPerformanceData()
        }
    }

    async getPerformanceData() {
        let result = await getData();
        this.setState({performanceData: result.data.entries}, () => {
            this.props.indexUpdated();
        })
    }

    render () {
        let dataIndex;
        if(this.state.performanceData != null){
            dataIndex = (
                <>
                    {this.state.performanceData.map(run => {
                        return <div class="item"><div class="content" key={run.id}>{run.data.message}</div></div>
                    })}
                </>
            )
        }
        return (
            <div class="ui celled list">
                {dataIndex}
            </div>
        )
    }
}

export default DisplayPerformanceData