import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/actions/typeAction";

ChartJS.register(ArcElement, Tooltip, Legend);

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

	const categorieArray: string[] = Array.from(categories);

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

	const data = {
		labels: categorieArray,
			datasets: [
			{
				label: "% du salaire",
				data: [
					transportPourcentage.toFixed(2),
					pensionPourcentage.toFixed(2),
					santePourcentage.toFixed(2),
					assurancesPourcentage.toFixed(2),
					alimentationPourcentage.toFixed(2),
					telephoniePourcentage.toFixed(2),
					fraisBancairesPourcentage.toFixed(2),
					loyersPourcentage.toFixed(2),
					restPourcentage.toFixed(2),
				],
				backgroundColor: [
					"rgb(255, 99, 132)",
					"rgb(54, 162, 235)",
					"rgb(255, 206, 86)",
					"rgb(75, 192, 192)",
					"rgb(153, 102, 255)",
					"rgb(255, 159, 64)",
					"red",
					"rgb(54, 162, 235)",
					"green",
				],
			},
		],
	};

	return (
		<div className="chart">
			<Doughnut datasetIdKey="id" data={data} />
		</div>
	);
}
