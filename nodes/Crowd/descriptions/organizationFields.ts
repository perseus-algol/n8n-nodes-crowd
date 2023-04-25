import { INodeProperties } from 'n8n-workflow';
import { organizationPresend } from '../GenericFunctions';
import { mapWith, showFor } from "./utils";

const displayOpts = showFor(['organization'])

const displayFor = {
	resource: displayOpts(),
	createOrUpdate: displayOpts(['create', 'update']),
	id: displayOpts(['delete', 'find', 'update']),
}

const organizationOperations: INodeProperties = {
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
			action: 'Create an organization',
			routing: {
				send: { preSend: [organizationPresend]},
				request: {
					method: 'POST',
					url: '/organization'
				}
			}
		},
		{
			name: 'Delete',
			value: 'delete',
			action: 'Delete an organization',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/organization/{{$parameter["id"]}}'
				}
			}
		},
		{
			name: 'Find',
			value: 'find',
			action: 'Find an organization',
			routing: {
				request: {
					method: 'GET',
					url: '=/organization/{{$parameter["id"]}}'
				}
			}
		},
		{
			name: 'Update',
			value: 'update',
			action: 'Update an organization',
			routing: {
				send: { preSend: [organizationPresend]},
				request: {
					method: 'PUT',
					url: '=/organization/{{$parameter["id"]}}'
				}
			}
		},
	],
};

const idField: INodeProperties = {
	displayName: 'ID',
	name: 'id',
	description: 'The ID of the organization',
	type: 'string',
	required: true,
	default: ''
}

const commonFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		description: 'The name of the organization',
		type: 'string',
		required: true,
		default: '',
	},
	{
		displayName: 'Url',
		name: 'url',
		description: 'The URL of the organization',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Description',
		name: 'description',
		description: 'A short description of the organization',
		type: 'string',
		typeOptions: {
			rows: 3
		},
		default: '',
	},
	{
		displayName: 'Logo',
		name: 'logo',
		description: 'A URL for logo of the organization',
		type: 'string',
		default: '',
	},
	{
		displayName: 'Employees',
		name: 'employees',
		description: 'The number of employees of the organization',
		type: 'number',
		default: '',
	},
	{
		displayName: 'Members',
		name: 'members',
		description: 'Members associated with the organization. Each element in the array is the ID of the member.',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		options: [
			{
				displayName: 'Item Choice',
				name: 'itemChoice',
				values: [
					{
						displayName: 'Member',
						name: 'member',
						type: 'string',
						default: ''
					}
				]
			}
		]
	},
];

const organizationFields: INodeProperties[] = [
	Object.assign({}, idField, displayFor.id),
	...commonFields.map(mapWith(displayFor.createOrUpdate))
];

export {
	organizationOperations,
	organizationFields,
}
