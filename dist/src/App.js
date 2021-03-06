//var React = require('react');
//var ReactDOM = require('react-dom');

var App = React.createClass({displayName: "App",
    loadBooksFromServer: function(){
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({items: data});
            }.bind(this)
        })
    },

    getInitialState: function(){
        return {items: []}; 
    }, 
    updateItems: function(newItem){
        var allItems = this.state.items.concat([newItem]);
        this.setState({items: allItems});
    },
    componentDidMount: function() {
        this.loadBooksFromServer();
        setInterval(this.loadBooksFromServer, 
                    this.props.pollInterval)
    }, 
    render: function() {
        console.log('data')
        if (this.state.items) {
            console.log('items!')
            //console.log(this.state.items)
            var items = this.state.items.map(function(item){
                //console.log(this.state.items)
                console.log(item)
                return React.createElement("li", null, " ", item.description, " | ", item.date, " |  ", item.tags, " ")
            })
            console.log(items)
        }
        return (
            React.createElement("div", null, 
                React.createElement(Banner, null), 
                React.createElement(List, {items: items}), 
                React.createElement(Form, {onFormSubmit: this.updateItems})
            )
        )
    }
}); 
    
ReactDOM.render(React.createElement(App, {url: "/api/task/", pollInterval: 1000}), document.body);
