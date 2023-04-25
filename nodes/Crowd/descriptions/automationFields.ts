import { INodeProperties } from 'n8n-workflow';
import { automationPresend } from '../GenericFunctions';
import { mapWith, showFor } from './utils';

const displayOpts = showFor(['automation']);

const displayFor = {
	resource: displayOpts(),
	createOrUpdate: displayOpts(['create', 'update']),
	id: displayOpts(['destroy', 'find', 'update']),
}

const automationOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: displayFor.resource.displayOptions,
	noDataExpression: true,
	default: 'list',
	options: [
		{
			name: 'Create',
			value: 'create',
			action: 'Create a new automation for the tenant',
			routing: {
				send: { preSend: [automationPresend]},
				request: {
					method: 'POST',
					url: '/automation'
				}
			}
		},
		{
			name: 'Destroy',
			value: 'destroy',
			action: 'Destroy an existing automation for the tenant',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/automation/{{$parameter["id"]}}'
				}
			}
		},
		{
			name: 'Find',
			value: 'find',
			action: 'Get an existing automation data for the tenant',
			routing: {
				request: {
					method: 'GET',
					url: '=/automation/{{$parameter["id"]}}'
				}
			}
		},
		{
			name: 'List',
			value: 'list',
			action: 'Get all existing automation data for tenant',
			routing: {
				request: {
					method: 'GET',
					url: '/automation'
				}
			}
		},
		{
			name: 'Update',
			value: 'update',
			action: 'Updates an existing automation for the tenant',
			routing: {
				send: { preSend: [automationPresend]},
				request: {
					method: 'PUT',
					url: '=/automation/{{$parameter["id"]}}'
				}
			}
		},
	],
};

const idField: INodeProperties = {
	displayName: 'ID',
	name: 'id',
	description: 'The ID of the automation',
	type: 'string',
	required: true,
	default: ''
}

const commonFields: INodeProperties[] = [
	{
		displayName: 'Trigger',
		name: 'trigger',
		description: 'What will trigger an automation',
		type: 'options',
		required: true,
		default: 'new_activity',
		options: [
			{
				name: 'New Activity',
				value: 'new_activity'
			},
			{
				name: 'New Member',
				value: 'new_member'
			}
		]
	},
	{
		displayName: 'URL',
		name: 'url',
		description: 'URL to POST webhook data to',
		type: 'string',
		required: true,
		default: ''
	}
];

const automationFields: INodeProperties[] = [
	Object.assign({}, idField, displayFor.id),
	...commonFields.map(mapWith(displayFor.createOrUpdate)),
];

export {
	automationOperations,
	automationFields
}
