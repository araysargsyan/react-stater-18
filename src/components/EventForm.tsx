import { FC, useState } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/user';
import { IEvent } from '../models/event';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useAppSelector } from '../hooks/redux';

interface IEventFormProps {
    guests: IUser[]
    submit: ( event: IEvent ) => void
}

const EventForm: FC<IEventFormProps> = ( { guests, submit } ) => {
    const { user } = useAppSelector( state => state.auth );
    const [ event, setEvent ] = useState<IEvent>( {
        author: user?.username || '',
        date: '',
        description: '',
        guest: ''
    } );

    function selectDate( date: Moment | null ) {
        if ( date ) {
            setEvent( { ...event, date: formatDate( date?.toDate() ) } );
        }
    }

    function submitForm() {
        submit( event );
    }

    return (
        <Form onFinish={ submitForm }>
            <Form.Item
                label="Description"
                name="description"
                rules={ [ rules.required() ] }
            >
                <Input
                    onChange={ e => setEvent( { ...event, description: e.target.value } ) }
                    value={ event.description }
                />
            </Form.Item>
            <Form.Item
                label="Date"
                name="date" 
                rules={ [ rules.required(), rules.isDateAfter( 'Do not create an event in the past' ) ] }
            >
                <DatePicker onChange={ ( date ) => selectDate( date ) } />
            </Form.Item>
            <Form.Item
                label="Guest"
                name="guest"
                rules={ [ rules.required() ] }
            >
                <Select onChange={ ( guest: string ) => setEvent( { ...event, guest } ) }>
                    { guests.map( guest => (
                        <Select.Option
                            value={ guest.username }
                            key={ guest.username }
                        >
                            { guest.username }
                        </Select.Option>
                    ) ) }
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Add
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;