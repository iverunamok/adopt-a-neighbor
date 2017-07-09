module.exports = {
	secret: 'asdfkljdaf$$%8923749hrwiy9fs$%^#8h9su928hfi2oh392',
	HELP_FIELDS: ['Visiting',
					'Technology Help',
					'Yard Work',
					'Indoor Cleaning',
					'Filing Paperwork',
					'Heavy Lifting',
					'Transportation',
					'Errands',
					'Other'],
	variable: (label) => label.toLowerCase().replace(/\s/g, '_')
}