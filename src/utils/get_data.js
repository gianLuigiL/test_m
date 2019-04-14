const get_data = async () => fetch("http://127.0.0.1:3001/cards").then(res => res.json());

export default get_data;