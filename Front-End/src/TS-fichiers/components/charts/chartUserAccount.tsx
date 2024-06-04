import ReactECharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/actions/typeAction";
import { User } from "../../interfaces/interfaces";

export function Chart() {
	const { nbAccount, userId } = useParams<{
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
			fetch("https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user", {
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
			fetch("https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/profile", {
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
	}, []);

	let target: User | undefined;
	if (role === "admin") {
		target = allUsers?.find((location) => location.id === userId);
	}
	if (role === "user") {
		target = dataUsers;
	}

	const targetAccount = target?.account.find(
		(account) => account.nbAccount === nbAccount
	);

	const operations = targetAccount?.operations.slice().reverse();

	const categories = new Set(
		operations?.map((operation) => operation.category)
	);
	categories.add("rest");
	categories.delete("null");
	categories.delete("salaire");

	const transport = operations?.filter(
		(operation) => operation.category === "transport"
	);
	const pension = operations?.filter(
		(operation) => operation.category === "pension"
	);
	const sante = operations?.filter(
		(operation) => operation.category === "santé"
	);
	const assurances = operations?.filter(
		(operation) => operation.category === "assurances"
	);
	const alimentation = operations?.filter(
		(operation) => operation.category === "alimentation"
	);
	const telephonie = operations?.filter(
		(operation) => operation.category === "téléphonie"
	);
	const fraisBancaires = operations?.filter(
		(operation) => operation.category === "frais bancaires"
	);
	const loyers = operations?.filter(
		(operation) => operation.category === "loyer"
	);
	const salaires = operations?.filter(
		(operation) => operation.category === "salaire"
	);

	let transportMontant: number = 0;
	transport?.forEach((operation) => {
		transportMontant += operation.montant;
	});

	let pensionMontant: number = 0;
	pension?.forEach((operation) => {
		pensionMontant += operation.montant;
	});

	let santeMontant: number = 0;
	sante?.forEach((operation) => {
		santeMontant += operation.montant;
	});

	let assurancesMontant: number = 0;
	assurances?.forEach((operation) => {
		assurancesMontant += operation.montant;
	});

	let alimentationMontant: number = 0;
	alimentation?.forEach((operation) => {
		alimentationMontant += operation.montant;
	});

	let telephonieMontant: number = 0;
	telephonie?.forEach((operation) => {
		telephonieMontant += operation.montant;
	});

	let fraisBancairesMontant: number = 0;
	fraisBancaires?.forEach((operation) => {
		fraisBancairesMontant += operation.montant;
	});

	let loyersMontant: number = 0;
	loyers?.forEach((operation) => {
		loyersMontant += operation.montant;
	});

	let salairesMontant: number = 0;
	salaires?.forEach((operation) => {
		salairesMontant += operation.montant;
	});

	let transportPourcentage: number =
		(Math.abs(transportMontant) * 100) / salairesMontant;
	let pensionPourcentage: number =
		(Math.abs(pensionMontant) * 100) / salairesMontant;
	let santePourcentage: number =
		(Math.abs(santeMontant) * 100) / salairesMontant;
	let assurancesPourcentage: number =
		(Math.abs(assurancesMontant) * 100) / salairesMontant;
	let alimentationPourcentage: number =
		(Math.abs(alimentationMontant) * 100) / salairesMontant;
	let telephoniePourcentage: number =
		(Math.abs(telephonieMontant) * 100) / salairesMontant;
	let fraisBancairesPourcentage: number =
		(Math.abs(fraisBancairesMontant) * 100) / salairesMontant;
	let loyersPourcentage: number =
		(Math.abs(loyersMontant) * 100) / salairesMontant;
	let restPourcentage: number =
		100 -
		transportPourcentage -
		pensionPourcentage -
		santePourcentage -
		assurancesPourcentage -
		alimentationPourcentage -
		telephoniePourcentage -
		fraisBancairesPourcentage -
		loyersPourcentage;

	const option = {
		tooltip: {
			trigger: "item",
		},
		legend: {
			show: true,
			bottom: 0,
      textStyle: {
        color: "#fff",
        fontSize: 16,
      }
		},
		series: [
			{
				height: "100%",
				width: "100%",
				label: {
					show: false,
				},
				name: `% du salaire`,
				type: "pie",
				radius: ["30%", "50%"],
				center: ["50%", "50%"],
				startAngle: 0,
				endAngle: 360,
				data: [
					{name: "Transport", value: transportPourcentage.toFixed(2)},
					{name: "Pension", value: pensionPourcentage.toFixed(2)},
					{name: "Sante", value: santePourcentage.toFixed(2)},
					{name: "Assurances", value: assurancesPourcentage.toFixed(2)},
					{name: "Alimentation", value: alimentationPourcentage.toFixed(2)},
					{name: "Telephonie", value: telephoniePourcentage.toFixed(2)},
					{name: "Frais bancaires", value: fraisBancairesPourcentage.toFixed(2)},
					{name: "Loyers", value: loyersPourcentage.toFixed(2)},
					{name: "Reste", value: restPourcentage.toFixed(2)},
				],
			},
		],
	};

	return (
		<div className="chart">
			<ReactECharts option={option} style={{height: "100%"}}/>
		</div>
	);
}
