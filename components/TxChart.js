import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

class TxChart extends Component {
    constructor(props) {
        super(props)
        this.createTxChart = this.createTxChart.bind(this)
    }
    componentDidMount() {
        this.createTxChart()
    }
    componentDidUpdate() {
        this.createTxChart()
    }
    createTxChart() {

        const width = window.innerWidth
        const height = window.innerHeight
        
        const node = this.node
        const dataMax = max(this.props.data)
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]])

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect')

        select(node)
            .attr('width', width)
            .attr('height', height)

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove()

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', '#fe9922')
            .attr('x', (d, i) => i * 25)
            .attr('y', d => this.props.size[1] - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 25)
    }
    render() {
        return <svg ref={node => this.node = node}
            width={500} height={500}>
        </svg>
    }
}
export default TxChart