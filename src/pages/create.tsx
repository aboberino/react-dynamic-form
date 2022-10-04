import { Accordion, ActionIcon, Alert, Badge, Box, Button, Card, Checkbox, Divider, Group, Input, Menu, Select, Stack, Textarea, useMantineTheme } from "@mantine/core"
import { AccordionControlProps } from "@mantine/core/lib/Accordion/AccordionControl/AccordionControl"
import { Bloc, BlocInput, BlocInputTypeOption } from "@prisma/client";
import { IconDots, IconTrash, IconChevronDown, IconPlus, IconBrandFlickr, IconAlignJustified, IconCheckbox, IconAlertCircle, IconEdit, IconDotsVertical } from "@tabler/icons";
import { useState } from "react";
import BlocComponent, { BlocInputParams, BlocParams } from "../components/BlocComponent";
import styles from "./create.module.css"
import { useForm } from '@mantine/form'

function getRandomNumber() {
    return Math.floor(Math.random() * 1000000)
}

export default function Create() {

    const form = useForm<BlocParams>({
        initialValues: {
            title: '',
            description: '',
            id: getRandomNumber(),
            code: '',
            inputs: []
        },
        validate: {
            title: (value) => value !== '' ? null : 'Invalid email',
        }
    });

    function onAddInput(type: string) {
        const input = {
            id: getRandomNumber(),
            name: 'Default',
            type: type,
            blocId: form.values.id,
            options: []
        } as (BlocInput & { options: BlocInputTypeOption[] })
        form.insertListItem('inputs', input)
    }

    function onDeleteInput(index: number) {
        form.removeListItem('inputs', index)
    }

    console.log('rerender')

    return (
        <div className={styles.containerOuter}>
            <h1 className={styles.title}>
                <span className={styles.titlePink}>Create a new form</span>
            </h1>
            <div className={styles.containerInner}>

                <Card shadow="sm" p="lg" radius="md" sx={{ overflow: 'visible' }} withBorder>
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                        <Stack>
                            <Input.Wrapper withAsterisk id='title' label='Titre'>
                                <Input variant="filled" id="title" placeholder="Ex: Mon formulaire" {...form.getInputProps('title')} />
                            </Input.Wrapper>
                            <Input.Wrapper id='description' label='Description'>
                                <Textarea variant="filled" id='description' placeholder="Ex: Ma Description" {...form.getInputProps('description')} />
                            </Input.Wrapper>

                            <Divider />
                            <div style={{ display: 'flex', gap: 8 }}>
                                <ButtonInput onAddInput={onAddInput} />
                                <Alert style={{ width: '100%' }} icon={<IconAlertCircle size={16} />} title="Ajoutez des champs en cliquant sur le bouton ci-dessus."> </Alert>
                            </div>
                            <Stack spacing='xl'>
                                {form.values.inputs?.map((input, index) => <InputComponent key={input.id} blocInput={input} form={form.getInputProps(`inputs.${index}.name`)} listIndex={index} onDeleteInput={onDeleteInput} />)}
                            </Stack>

                            <Group position="right" mt="md">
                                <Button type="submit" variant="gradient">Enregistrer</Button>
                            </Group>
                        </Stack>
                    </form>
                </Card>

                <BlocComponent id={4} code={'FIEZFEIF'} title={form.values.title} description={form.values.description} inputs={form.values.inputs} />

            </div>
        </div>
    )
}


function InputComponent({ blocInput, form, listIndex, onDeleteInput }: BlocInputParams & { form?: any, listIndex: number, onDeleteInput: (index: number) => void }) {
    const id = blocInput.id + blocInput.name
    switch (blocInput.type) {
        case 'text':
            return <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <Menu shadow="md" width={160} withArrow>
                    <Menu.Target>
                        <ActionIcon variant="light" size='lg' color='blue' ><IconDotsVertical size={16} /></ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label sx={{ textAlign: 'center' }}><Badge color="cyan" radius="sm" sx={{ width: 'min-content' }}>Text</Badge></Menu.Label>
                        <Menu.Divider />
                        <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => onDeleteInput(listIndex)}>Delete</Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Badge color="cyan" radius="sm" sx={{ minWidth: 70, height: 36 }}>Text</Badge>
                <Group>
                    <Input variant="filled" id={id} placeholder="Label de l'input" {...form} />
                    <Checkbox label="Required" />
                </Group>
            </div >

        case 'select':
            return (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <Menu shadow="md" width={160} withArrow>
                        <Menu.Target>
                            <ActionIcon variant="light" size='lg' color='blue' ><IconDotsVertical size={16} /></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label sx={{ textAlign: 'center' }}><Badge color="cyan" radius="sm" sx={{ width: 'min-content' }}>Select</Badge></Menu.Label>
                            <Menu.Item icon={<IconEdit size={14} />}>Edit</Menu.Item>
                            <Menu.Divider />
                            <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => onDeleteInput(listIndex)}>Delete</Menu.Item>

                        </Menu.Dropdown>
                    </Menu>

                    <Badge color="violet" radius="sm" sx={{ minWidth: 70, height: 36 }}>Select</Badge>
                    <Group>
                        <Input variant="filled" id={id} placeholder="Label de l'input" {...form} />
                        <Checkbox label="Required" />
                    </Group>
                </div>
            )

        default:
            return <></>
    }
}

function ButtonInput({ onAddInput }: { onAddInput: (type: string) => void }) {
    return (
        <div style={{ display: 'flex' }}>
            <Button leftIcon={<IconPlus size={16} />} variant="light" sx={{ borderRadius: '4px 0 0 4px' }} onClick={() => onAddInput('text')} >
                Input
            </Button>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon sx={{ height: 36, borderRadius: '0 4px 4px 0', width: 36 }} color='blue' variant="filled"><IconChevronDown size={16} /></ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item icon={<IconChevronDown size={14} />} onClick={() => onAddInput('select')} >Select</Menu.Item>
                    <Menu.Item icon={<IconBrandFlickr size={14} />}>Radio button</Menu.Item>
                    <Menu.Item icon={<IconCheckbox size={14} />}>Check box</Menu.Item>
                    <Menu.Item icon={<IconAlignJustified size={14} />}>Rich area</Menu.Item>
                    <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete my account</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}


function AccordionControl(props: AccordionControlProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Accordion.Control {...props} />
            <ActionIcon size="lg">
                <IconDots size={16} />
            </ActionIcon>
        </Box>
    );
}