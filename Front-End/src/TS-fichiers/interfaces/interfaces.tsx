

export interface User {
	role: string;
	id: string;
	lastName: string;
	firstName: string;
	userName: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	account: AccountData[];
	budget: BudgetModel[];
}
export interface BudgetModel {
	name: string;
	value: number;
}
export interface AccountData {
	firstName: string;
	name: string;
	nbAccount: string;
	solde: number;
	_id: number;
  cardNumber: string;
  cardDate: string;
	visible: boolean;
	operations: Operation[];
}
export interface Operation {
	title: string;
	date: string;
	montant: number;
	description: string;
	_id: string;
	category: string;
}

export 	interface BeneficiairesExternes {
	name: string;
	rib: string;
	onDelete: (rib: string) => void;
	onModify: ( oldRib: string, name: string, rib: string) => void;
}

export interface BackArrowProps {
	chemin: string;
}
