import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import ProdutosNovo from './ProdutosNovo'
import ProdutosEditar from './ProdutosEditar'

class Produtos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editingCategoria: ''
        }
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.renderCategoria = this.renderCategoria.bind(this)
        this.editCategoria = this.editCategoria.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)
        this.handleEditCategoria = this.handleEditCategoria.bind(this)
    }
    
    componentDidMount() {
        //buscar categorias
        this.props.loadCategorias()
    }
    editCategoria(cat) {
        this.setState({
            editingCategoria: cat.id
        })
    }
    cancelEditing() {
        this.setState({ editingCategoria: ''})
    }
    renderCategoria(cat) {
        return (
            <li key={cat.id}>
                { this.state.editingCategoria === cat.id && 
                    <div className='input-group'>
                        <div className='input-group-btn'>
                            <input type='text' ref={'cat-'+cat.id} defaultValue={cat.categoria} className='form-control' onKeyUp={this.handleEditCategoria}/>
                            <button className='btn' onClick={this.cancelEditing}>Cancel</button>
                        </div>
                    </div>
                }
                { this.state.editingCategoria !== cat.id && 
                <div>
                    <button className='btn btn-sm' onClick={() => this.props.removeCategoria(cat)}>
                        <span className='fas fa-trash-alt'></span>
                    </button>
                    <button className='btn btn-sm' onClick={() => this.editCategoria(cat)}>
                        <span className='fas fa-edit'></span>
                    </button>
                    <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
                </div>
                }
            </li>
            
        )
    }
    handleNewCategoria(key) {
        if(key.keyCode === 13) {
            this.props.createCategoria({ categoria: this.refs.categoria.value} )
            this.refs.categoria.value = ''
        }
    }
    handleEditCategoria(key) {
        if(key.keyCode === 13) {
            this.props.editCategoria({ id: this.state.editingCategoria, categoria: this.refs['cat-'+this.state.editingCategoria].value } )
            this.setState({
                editingCategoria: ''
            })
        }
    }
    render() {
        const { match, categorias } = this.props
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        { categorias.map(this.renderCategoria)}
                    </ul>
                    <div className='card'>
                        <input 
                        type='text' 
                        ref='categoria'
                        className='form-control'
                        placeholder='Nova Categoria' 
                        onKeyUp={this.handleNewCategoria}/>
                    </div>
                    <Link to='/produtos/novo'>Novo produto</Link>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url+'/novo'} 
                        render={(props) => {
                            return (
                                <ProdutosNovo {...props} 
                                    categorias={categorias}
                                    createProduto={this.props.createProduto}
                                />
                            )
                        }}
                    />
                    <Route path={match.url+'/editar/:id'}
                        render={
                            (props) => {
                                return (
                                    <ProdutosEditar {...props} 
                                    readProduto={this.props.readProduto}
                                    categorias={categorias}
                                    editProduto={this.props.editProduto}
                                    />
                                )
                            }
                        }
                    />
                    <Route path={match.url+'/categoria/:catId'} 
                        render={(props) => {
                            return (
                                <Categoria 
                                    {...props}
                                    loadProdutos={this.props.loadProdutos}
                                    produtos={this.props.produtos}
                                    loadCategoria={this.props.loadCategoria}
                                    categoria={this.props.categoria}
                                    removeProduto={this.props.removeProduto}
                                />
                            )
                        }}
                    />
                </div>
            </div>
        )
    }
}
export default Produtos