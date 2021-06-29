import { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
	state = { data: {}, errors: {} };

	removeProperty = (data, prop) => {
		return Object.keys(data).reduce((object, key) => {
			if (key !== prop) {
				object[key] = data[key];
			}
			return object;
		}, {});
	};
	validate = (type) => {
		if (type === "final") {
			const data = { ...this.state.data };
			const schema = { ...this.schema };
			const newData = this.removeProperty(data, "partsRequirements");
			const newSchema = this.removeProperty(schema, "partsRequirements");
			const { error } = Joi.validate(newData, newSchema, {
				abortEarly: false,
			});
			return error ? { [type]: error.details[0].message } : null;
		} else {
			let result = {};
			for (let item of this.state.data[type]) {
				result[item.id] = Joi.validate(item, this.schema[type], {
					abortEarly: false,
				});
			}
			const errors = {};
			for (let obj of Object.keys(result)) {
				if (result[obj].error) {
					for (let item of result[obj].error.details) {
						errors[item.path[0] + [obj]] = errors[item.path[0]]
							? errors[item.path[0]]
							: item.message;
					}
				}
			}
			return errors;
		}
	};
	validateProperty({ name, value }, type) {
		const obj = { [name]: value };
		let schema = {};
		if (type === "label") {
			schema = { [name]: this.schema[name] };
		} else {
			schema = { [name]: this.schema[type][name] };
		}
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}

	handleChange =
		(type) =>
		({ currentTarget: input }) => {
			const errors = { ...this.state.errors };
			const errorMsg = this.validateProperty(input, type);

			if (errorMsg) errors[input.id] = errorMsg;
			else delete errors[input.id];
			const data = { ...this.state.data };
			if (type === "label") {
				data[input.name] = input.value;
			} else {
				let target = data[type].find((e, i) => {
					return `${input.name}${i}` === input.id;
				});
				target[input.name] = input.value;
			}
			this.setState({ data, errors });
		};
	handleSelect = (target) => (e) => {
		const data = { ...this.state.data };
		data[target] = e.target.value;
		this.setState({ data });
	};

	handleSubmit = (type) => (e) => {
		e.preventDefault();
		const error1 = this.validate(type);
		const error2 = this.validate("final");
		const errors = Object.assign(error1, error2);

		this.setState({ errors: errors || {} });
		if (Object.keys(errors).length > 0) {
			console.log(errors);
			alert("There is some error");

			return;
		}

		this.doSubmit(type);
	};
}

export default Form;
