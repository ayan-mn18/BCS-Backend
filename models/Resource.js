const mongoose = require('mongoose');
const Featured_product = require('./Featured_product');


const resource = new mongoose.Schema({
    banner_urls :[{
        type : String,
        required : true,
        default : 'https://zesty-naiad-9a1978.netlify.app/static/media/headermain.64aa765442b1a6ecc70d.png',
        // validate : {
            // validator : () =>{
                // return !(banner_urls.length > 3);
            // },
            // message : props => `${props.value} exceeds maximum banner Urls size i.e. 3 !`
        // }
    }],
    categories :[{
        category_name : {
            type : String,
            required : true,
            default : "Category of BCS"
        },
        category_url: {
            type : String,
            required : true,
            default : "https://zesty-naiad-9a1978.netlify.app/static/media/leangainer.6c79df357532dbdfe550.png"
        },
        // validate : {
            // validator : () =>{
                // return !(categories.length > 3);
            // },
            // message : props => `${props.value} exceeds maximum category size i.e. 3 !`
        // }
    }],
    product_info : [{
        url : {
            type : String,
            required : true ,
        },
        heading : {
            type : String,
            required : true,
        },
        feature_points : [{
            type: String,
            required : true,
            default :'Helps in building lean muscles',
            // validate : {
                // validator : () =>{
                    // return !(feature_points.length > 4);
                // },
                // message : props => `${props.value} exceeds maximum product info points size i.e. 4 !`
            // }
        }],
        // validate : {
            // validator : () =>{
                // return !(product_info.length > 2);
            // },
            // message : props => `${props.value} exceeds maximum featured product info size i.e. 2 !`
        // }
    }],
    best_sellers_fpid : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Featured_product',
        // autopopulate : true 
        // validate : {
            // validator : () =>{
                // return !(best_sellers_fpid.length > 3);
            // },
            // message : props => `${props.value} exceeds maximum featured product best seller size i.e. 3 !`
        // }
    }] ,
    our_main_ingredients :[{
        heading : {
            type : String,
            required : true,
            default : "Ingredients"
        },
        desc : {
            type : String,
            required : true,
            default : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        url: {
            type : String,
            required : true,
            default : "https://zesty-naiad-9a1978.netlify.app/static/media/leangainer.6c79df357532dbdfe550.png"
        },
        // validate : {
            // validator : () =>{
                // return !(our_main_ingredients.length > 3);
            // },
            // message : props => `${props.value} exceeds maximum our main ingredients size i.e. 3 !`
        // }
    }],
    details_of_BCS :[{
        heading : {
            type : String,
            required : true,
            default : "BCS an Evergrowing Brand !"
        },
        desc : {
            type : String,
            required : true,
            default : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        // validate : {
            // validator : () =>{
                // return !(details_of_BCS.length > 6);
            // },
            // message : props => `${props.value} exceeds maximum review's size i.e. 6 !`
        // }
    }],
    reviews : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Reviews',
        // autopopulate : true 
        // validate : {
            // validator : () =>{
                // return !(reviews.length > 3);
            // },
            // message : props => `${props.value} exceeds maximum review's size i.e. 3 !`
        // }
    }]
});
resource.plugin(require('mongoose-autopopulate'));

const Resource = mongoose.model("Resource" ,resource);

module.exports = Resource;