import axios from 'axios'
const { REACT_APP_API_BASE_URI: API } = process.env

export async function saveOrder() {
    
}

export async function makeEmail(to, name, order) {
	const games = order.games.map(game => (
		`<li>
			<span>Nombre: ${game.name} X${game.cant}</span> <br>
			<span>Precio: ${game.price}</span>
		</li>`
	))
    axios.post(API + 'sendMail', {
        to,
        subject: 'Compra Realizada con exito!',
        html: `
        <h1>Hola ${name}, gracias por su compra en GameScript</h1>
				<span><b>Identificador de orden:</b> ${order.id}</span> <br>
				<span><b>Fecha:</b>  ${order.date}</span> <br>
				<span><b>Monto Final</b> : $${order.totalprice}<span>
				<h5>Juegos obtenidos</h5>
        <ul>
					${games}
        </ul>
        `
    })
}