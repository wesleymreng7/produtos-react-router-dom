import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Produtos extends Component {
    constructor(props) {
        super(props)
        this.handleNewProduto = this.handleNewProduto.bind(this)
        this.state = {
            redirect: false
        }
    }
    handleNewProduto() {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto).then(res => {
            this.setState({
                redirect: '/produtos/categoria/'+produto.categoria
            })
        })
    }
    render() {
        const { categorias } = this.props
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Novo Produto</h2>
                <select ref='categoria'>
                    {categorias.map((cat) => {
                        return (<option value={cat.id} key={cat.id}>{cat.categoria}</option>)
                    })}
                </select>
                <input type='text' placeholder='Nome do Produto' className='form-control' ref='produto'/>
                <button className='btn btn-primary' onClick={this.handleNewProduto}>Salvar</button>
            </div>
        )
    }
}

export default Produtos