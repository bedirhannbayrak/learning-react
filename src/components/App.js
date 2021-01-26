import React from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import EditdMovie from './EditMovie';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";



class App extends React.Component {

    state = {
        movies: [],

        searchQuery: ""
    }

    async componentDidMount() {
        const response = await axios.get('http://localhost:3003/movies');
        this.setState({ movies: response.data })

    }

    deleteMovie = async (movie) => {
        const baseURL = `http://localhost:3003/movies/${movie.id}`;
        await axios.delete(baseURL);
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => ({
            movies: newMovieList
        }))
    }

    searchMovie = (event) => {
        //console.log(event.target.value)
        this.setState({ searchQuery: event.target.value })
    }

    addMovie = async (movie) => {
        await axios.post(`http://localhost:3003/movies`, movie)
        this.setState( state =>({
            movies: state.movies.concat([movie])
        }))
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a,b) => { return b.id-a.id })

        return (
            <Router>
                <div className="container">

                    <Route path='/' exact render={() => (
                        <React.Fragment>
                            <div className="row">
                                <div className="col-lg-12">
                                    <SearchBar searchMovieProp={this.searchMovie} />
                                </div>
                            </div>

                            <MovieList
                                movies={filteredMovies}
                                deleteMovieProp={this.deleteMovie} />
                        </React.Fragment>
                    )}>

                    </Route>
                    <Route path='/add'  render={( {history}) => (

                        <AddMovie

                            onAddMovie={(movie) => { this.addMovie(movie) 
                            history.push('/')}
                           
                        }
                        />

                    )}>
                    </Route>

                    <Route path="/edit/:id" component={EditdMovie} />

                </div>
            </Router>
        )

    }


}

export default App;