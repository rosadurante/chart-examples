/*  globals define */

define('pieChart', ['underscore', 'd3'], function (_, d3) {
    'use strict';

    var PieChart = function (options) {
        this.element = options.element || 'body';
        this.data = options.data || [];
        this.width = options.size || 500;
        this.height = options.size || 500;
        this.radio = options.radio || ( (options.size * 2 / 5) || 200 );
        this.labelSize = (this.width - this.radio) / 10 || 30;
        this.timeAnimation = 500;
        this.legendSize = 200;

        this.innerRadio = options.innerRadio || ( (options.size / 10 ) || 50 );
        this.textOffset = options.textOffset || 0;
        this.colour = d3.scale.category20c();

        // Private functions

        /**
         *
         */
        this._initChart = function () {
            var self = this;

            this.chart = d3.select(this.element).append('svg')
                .attr("width", this.width)
                .attr("height", this.height + this.legendSize);

            this.donut = d3.layout.pie().value(function (d) { return d.value; });
                // .startAngle(-1 * Math.PI)
                // .endAngle(0);

            this.arc = d3.svg.arc()
                .innerRadius(this.innerRadio)
                .outerRadius(this.radio);

            this.arcGroup = this.chart.append("svg:g")
                .attr("class", "arc")
                .attr("transform", "translate(" + (this.width/2) + "," + (this.height/2 + this.legendSize) + ")");

            this.labelGroup = this.chart.append("svg:g")
                .attr("class", "label-group")
                .attr("transform", "translate(" + (this.width/2) + "," + (this.height/2 + this.legendSize) + ")");

            this.initAnimation = function (b) {
                var i = d3.interpolate({startAngle: -1 * Math.PI, endAngle: -1 * Math.PI}, b);
                return function (t) { return self.arc(i(t)); };
            };

            this.animatedArcWhenClick = function (arc, index) {};
        };

        /**
         *
         */
        this._buildArcs = function () {
            var self = this;

            // this.donut = d3.layout.pie().value(function (d) { return d.value; })
            //     .startAngle(-1 * Math.PI)
            //     .endAngle(0);

            this.paths = this.arcGroup.selectAll("path").data(this.donut(this.data));
            this.paths.enter()
                .append("svg:g")
                    .attr("class", "slice")
                .append("svg:path")
                    .attr("stroke", "white")
                    .attr("stroke-width", 0.5)
                    .attr("d", this.arc)
                    .attr("fill", function(d, i) { return self.colour(i); })
                    .on("click", this.animatedWhenClick)
                    .transition()
                        .ease("out")
                        .duration(this.timeAnimation)
                        .attrTween("d", this.initAnimation);
        };

        /**
         *
         */
        this._buildLegend = function () {
            var self = this;

            // this.donut = d3.layout.pie().value(function (d) { return d.value; });

            this.rectLabels = this.labelGroup.selectAll("rect").data(this.donut(this.data));
            this.rectLabels.enter()
                .append("rect")
                    .attr("width", this.radio)
                    .attr("height", this.radio / 10)
                    .attr("x", 10)
                    .attr("y", function (d,i) { return ((-1 * self.radio) + (self.labelSize * i)) - self.radio; })
                    .attr("fill", function (d,i) { return self.colour(i); });

            this.valueLabels = this.labelGroup.selectAll("text.value").data(this.donut(this.data));
            this.valueLabels.enter()
                .append("svg:text")
                    .attr("class", "value")
                    // .attr("transform", labelTransform)
                    .attr("dy", function (d, i) { return (-1 * self.radio) + (i * self.labelSize) + (self.labelSize/2) - self.radio; })
                    .attr("dx", this.radio / 2)
                    .attr("fill", "white")
                    .attr("text-anchor", function (d) { return "middle";
                    }).text(function (d) {
                        var percentage = (d.value / self.getTotal()) * 100;
                        return percentage.toFixed(1) + "%  " + d.data.label;
                    });
        };

        this.drawChart();
    };

    /**
     *
     */
    PieChart.prototype.getTotal = function () {
        return parseFloat(_.reduce(this.data, function (memo, item) { return memo + item.value; }, 0).toFixed(2));
    };

    /**
     *
     */
    PieChart.prototype.drawChart = function () {
        if (!this.chart) this._initChart();

        this._buildArcs();
        this._buildLegend();
    };

    /**
     *
     */
    PieChart.prototype.updateData = function (data) {
        this.data = data;

        this.paths.remove();
        this.rectLabels.remove();
        this.valueLabels.remove();

        this.drawChart();
    };

    return PieChart;
});