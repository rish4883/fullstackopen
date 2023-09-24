import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
}

const create = (contact) => {
  const req = axios.post(baseUrl, contact);
  return req.then(res => res.data);
}

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
 
}

const replaceContact = (id, contact) => {
  const req = axios.put(`${baseUrl}/${id}`, contact) 
  return req.then(res => res.data)

}

export default {getAll, create, deleteContact, replaceContact}