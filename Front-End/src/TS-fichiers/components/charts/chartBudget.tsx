import React from "react";
import ReactECharts from "echarts-for-react";


interface Data {
	name: string;
	value: number;
}

interface ChartBudgetProps {
  categoryName: string;
  categoryValue: number;
  categoryBudget: number;
}

export function ChartBudget({categoryName, categoryValue, categoryBudget}: ChartBudgetProps) {

	const option = {
		tooltip: {
			trigger: "item",
		},
		legend: {
			show: false
		},
		series: [
			{
				name: `Budget ${categoryName}`,
				type: "pie",
				radius: ["60%", "90%"],
				center: ["50%", "50%"],
				startAngle: 0,
				endAngle: 360,
				data: [{name: "déjà dépensé", value: categoryValue}, {name: "Non dépensé", value: (categoryBudget - categoryValue).toFixed(2)}] as Data[],
				label: {
					show: false,
				},
        color: ['#0066ff', '#003d99'],
			},
		],
	};

	return (
		<div className="chartBudget">
			<ReactECharts option={option} style={{height: "100%"}}/>
		</div>
	);
}
