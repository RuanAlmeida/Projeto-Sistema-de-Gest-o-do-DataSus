const erroPadrao = () => {
	let msgServerError = "Ocorreu um erro, favor entrar em contato com a administração do sistema.";

	return msgServerError;
}

module.exports = () => {
	return erroPadrao;
};