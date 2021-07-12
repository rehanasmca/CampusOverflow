import React, { Component } from 'react';
import Classes from './mailing.module.css';

class UniversityTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getData = () => {
        fetch('university_A_template.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                this.setState({ value: myJson });
            });
    }


    componentDidMount() {
        this.getData();

    }

    render() {
        return (
            <div className={Classes.mainDiv}>
                <div className={Classes.header}>
                    <img src={this.state.value ? this.state.value.logo : ''} alt="no image" />
                    <h1>{this.state.value ? this.state.value.universityName : ''}</h1>
                    <h6>Established year : {this.state.value ? this.state.value.establishYear : ''}</h6>
                </div>
                <div>
                    {this.state.value && this.state.value.courses ?
                        <div>
                            <h5>Courses offered : </h5>
                            <h5>Batchlor courses</h5>
                            {this.state.value ? this.state.value.courses.BatchlorDegrees.science.map(item => <h6>{item}</h6>) : ''}
                            {this.state.value ? this.state.value.courses.BatchlorDegrees.commerce.map(item => <h6>{item}</h6>) : ''}
                            <h5>PG Courses</h5>
                            {this.state.value ? this.state.value.courses.pgCourses.science.map(item => <h6>{item}</h6>) : ''}
                            {this.state.value ? this.state.value.courses.pgCourses.commerce.map(item => <h6>{item}</h6>) : ''}
                        </div> : ''}
                </div>
                <h1>{this.state.value ? this.state.value.mainheading : ''}</h1>
               <div>
                   <h5>{this.state.value ? this.state.value.mainConcept.heading : ''}</h5>
                <p>{this.state.value ? this.state.value.mainConcept.content.replace("\\n", " ") : ''}</p>
                {this.state.value && this.state.value.mainConcept.image ? <img src={this.state.value.mainConcept.image} /> : ''}
               </div>
               
               {this.state.value && this.state.value.subConcept ? Object.keys(this.state.value.subConcept).map((item, index) =><div key={index}>
               <h5>{this.state.value.subConcept[item].subHeading}</h5>
               <p>{this.state.value.subConcept[item].content}</p>
               {this.state.value.subConcept[item].image? <img src={this.state.value.subConcept[item].image} /> : ''}
               </div>) : ''}
               <h5>Reference links</h5>
               {this.state.value && this.state.value.links ? Object.keys(this.state.value.links).map((item, index) =><div key={index}>
              
               <a href={this.state.value.links[item]}>{this.state.value.links[item]}</a>
                </div>) : ''}

            </div>
        )
    }
}

export default UniversityTemplate;