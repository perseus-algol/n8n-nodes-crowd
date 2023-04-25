import { INodeProperties } from 'n8n-workflow';
import { notePresend } from '../GenericFunctions';
import { mapWith, showFor } from "./utils";

const displayOpts = showFor(['note'])

const displayFor = {
	resource: displayOpts(),
	createOrUpdate: displayOpts(['create', 'update']),
	id: displayOpts(['delete', 'find', 'update']),
}

const noteOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: displayFor.resource.displayOptions,
	noDataExpression: true,
	default: 'find',
	options: [
		{
			name: 'Create',
			value: 'create',
			action: 'Create a note',
			routing: {
				send: { preSend: [notePresend]},
				request: {
					method: 'POST',
					url: '/note'
				}
			}
		},
		{
			name: 'Delete',
			value: 'delete',
			action: 'Delete a note',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/note/{{$parameter["id"]}}'
				}
			}
		},
		{
			name: 'Find',
			value: 'find',
			action: 'Find a note',
			routing: {
				request: {
					method: 'GET',
					url: '=/note/{{$parameter["id"]}}'
				}
			}
		},
		{
			name: 'Update',
			value: 'update',
			action: 'Update a note',
			routing: {
				send: { preSend: [notePresend]},
				request: {
					method: 'PUT',
					url: '=/note/{{$parameter["id"]}}'
				}
			}
		},
	]
}

const idField: INodeProperties = {
	displayName: 'ID',
	name: 'id',
	description: 'The ID of the note',
	type: 'string',
	required: true,
	default: ''
}

const commonFields: INodeProperties[] = [
	{
		displayName: 'Body',
		name: 'body',
		description: 'The body of the note',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: ''
	}
];

const noteFields: INodeProperties[] = [
	Object.assign({}, idField, displayFor.id),
	...commonFields.map(mapWith(displayFor.createOrUpdate))
];

export {
	noteOperations,
	noteFields,
}
