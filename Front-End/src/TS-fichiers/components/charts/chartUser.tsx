import ReactECharts from "echarts-for-react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/actions/typeAction";

interface Data {
	name: string;
	value: number;
}

export function ChartUser() {
	const dataUsers = useSelector((state: RootState) => state.user);
	const target = dataUsers;

	const option = {
		tooltip: {
			trigger: "item",
		},
		legend: {
			bottom: "0",
			left: "center",
			width: "75%",
			textStyle: {
				color: "#fff",
				fontSize: 16,
			},
		},
		series: [
			{
				name: "Répartition du portefeuille",
				type: "pie",
				radius: ["60%", "100%"],
				center: ["50%", "70%"],
				startAngle: 180,
				endAngle: 360,
				data: [] as Data[],
				label: {
					show: false,
				},
			},
		],
	};

	target?.account.forEach((a) => {
		if (a.visible) {
			option.series[0].data.push({
				value: parseFloat(a.solde.toFixed(2)),
				name: a.name,
			});
		}
	});

	return <ReactECharts option={option} />;
}
