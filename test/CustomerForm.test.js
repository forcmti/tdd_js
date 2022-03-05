import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {

    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const labelFor = formElemet => container.querySelector(`label[for="${formElemet}"]`);

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    const field = name => form('customer').elements[name];

    const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
        render(<CustomerForm/>);
        expectToBeInputFieldOfTypeText(field(fieldName));
    });

    describe('first name field', () =>{

        itRendersAsATextBox('firstName');
    
        it('includes the existing value', () => {
            render(<CustomerForm firstName="Ashley"/>);
            expect(field('firstName').value).toEqual('Ashley');
        });
    
        it('renders a label', ()=>{
            render(<CustomerForm/>);
            expect(labelFor('firstName')).not.toBeNull();
            expect(labelFor('firstName').textContent).toEqual('FirstName');
        });
    
        it('assigns an id that matches the label id', () => {
            render(<CustomerForm/>);
            expect(field('firstName').id).toEqual('firstName');
        });
    
        it('saves existing value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    firstName="Ashley" onSubmit = {({firstName}) => expect(firstName).toEqual('Ashley')}
                />
            );
            await ReactTestUtils.Simulate.submit(form('customer'));
    
        });
    
        it('saves new value when submitted', async () => {
    
            expect.hasAssertions();
            render(
                <CustomerForm
                    firstName="Ashley"
                    onSubmit = {({firstName}) => expect(firstName).toEqual('Jamie')}
                />
            );
    
            await ReactTestUtils.Simulate.change(field('firstName'),{
                target:{value:'Jamie'}
            });
    
            await ReactTestUtils.Simulate.submit(form('customer'));
    
        });
    });

    describe('last name field', () =>{

    });

    describe('phone number field', () =>{

    });


    

    it('renders a form', () => {
        render(<CustomerForm/>);
        expect(form('customer')).not.toBeNull();
    });



});