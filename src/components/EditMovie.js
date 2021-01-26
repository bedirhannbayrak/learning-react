import React from 'react';
import axios from 'axios';



class EditMovie extends React.Component {

    state = {
        name:"",
        rating:"",
        overview:"",
        imageURL:""
    }

    async componentDidMount(){
        const id = this.props.match.params.id
        const response = await axios.get(`http://localhost:3003/movies/${id}`)
        const movie = response.data
        
        this.setState({
            name:movie.name,
            rating:movie.rating,
            overview:movie.overview,
            imageURL:movie.imageURL

        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
    }

    onInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)

        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {

        return  (
            <div className="container">
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
            <input className="form-control" id="disabledInput" type="text" placeholder="Edit the form to update.." disabled/>
                <div className="form-row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input  type="text" 
                                className="form-control" 
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange}/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="rating"
                                value={this.state.rating}
                                onChange={this.onInputChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="imageURL"
                                value={this.state.imageURL}
                                onChange={this.onInputChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea 
                                className="form-control" 
                                name="overview" rows="5"
                                value={this.state.overview}
                                onChange={this.onInputChange}></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger btn-block" value="Edit Movie" />
            </form>
        </div>
        )

    }
}


export default EditMovie;