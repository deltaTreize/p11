import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/actions/typeAction";
import { useSelector } from "react-redux";

interface User {
	role: string;
	id: string;
	lastName: string;
	firstName: string;
	userName: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	account: AccountData[];
}

interface AccountData {
	firstName: string;
	name: string;
	nbAccount: string;
	solde: number;
	_id: number;
	visible: boolean;
	operations: Operation[];
}
interface Operation {
	title: string;
	date: string;
	montant: number;
	description: string;
	_id: string;
	category: string;
}
interface Data {
	name: string;
	value: number;
}

export function ChartUser() {
	const { userId } = useParams<{
		nbAccount: string;
		userId: string;
	}>();

	const token = useSelector((state: RootState) => state.token.token);
	const role = useSelector((state: RootState) => state.user.role);
	const [dataUsers, setDataUsers] = useState<User | undefined>();
	const id = useSelector((state: RootState) => state.user.id);
	const [allUsers, setAllUsers] = useState<User[]>([]);

	useEffect(() => {
		if (role === "admin") {
			fetch("http://localhost:3001/api/v1/user", {
				method: "GET",
				headers: {
					id: `${id}`,
				},
			})
				.then((data) => data.json())
				.then((dataJson) => {
					setAllUsers(dataJson.body);
				});
		}

		if (role === "user") {
			fetch("http://localhost:3001/api/v1/user/profile", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((alldata) => alldata.json())
				.then((data) => {
					setDataUsers(data.body);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, id]);

	let target: User | undefined;
	if (role === "admin") {
		target = allUsers?.find((location) => location.id === userId);
	}
	if (role === "user") {
		target = dataUsers;
	}

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
      }
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
          show: false
        }
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
