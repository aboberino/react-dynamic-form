import { ActionIcon, Badge, Button, Card, Checkbox, Divider, Group, Input, Menu, Stack, Textarea, useMantineTheme } from "@mantine/core"
import { BlocInput, BlocInputTypeOption } from "@prisma/client";
import { IconTrash, IconChevronDown, IconPlus, IconBrandFlickr, IconAlignJustified, IconCheckbox, IconEdit, IconDotsVertical, IconGripVertical } from "@tabler/icons";
import { useState } from "react";
import BlocComponent, { BlocInputParams, BlocParams } from "../components/BlocComponent";
import styles from "./create.module.css"
import { useForm } from '@mantine/form'
import ModalOptions from "../components/ModalOptions/ModalOptions";
import { DndContext, useSensor, PointerSensor, closestCenter, DragCancelEvent, UniqueIdentifier } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers'


function getRandomNumber() {
    return Math.floor(Math.random() * 1000000)
}

export default function Create() {
    const theme = useMantineTheme()

    const [opened, setOpened] = useState(false)
    const [currentOptionIndex, setCurrentOptionIndex] = useState(0)

    const form = useForm<BlocParams>({
        initialValues: {
            title: '',
            description: '',
            id: getRandomNumber(),
            code: '',
            inputs: [
                {
                    blocId: 481260,
                    id: 689087,
                    name: "Pays",
                    type: "select",
                    order: 0,
                    options: [{
                        id: 88948489,
                        value: 'France',
                        label: 'France',
                        blocInputId: 689087,
                    }],
                }
            ]
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
            options: [],
            order: form.values.inputs.length,
        } as (BlocInput & { options: BlocInputTypeOption[] })
        form.insertListItem('inputs', input)
    }

    function onDeleteInput(index: number) {
        form.removeListItem('inputs', index)
    }

    console.log('rerender')

    const sensors = [useSensor(PointerSensor)]

    function handleDragEnd({ active, over }: DragCancelEvent) {
        if (over) {
            if (active.id !== over.id) {
                const convertUIDToNumber = (id: UniqueIdentifier) => typeof id === 'string' ? parseInt(id) : id
                const oldIndex = form.values.inputs.findIndex(input => input.id === convertUIDToNumber(active.id))
                const newIndex = form.values.inputs.findIndex(input => input.id === convertUIDToNumber(over.id))
                form.reorderListItem('inputs', { from: oldIndex, to: newIndex })
            }
        }
    }

    return (
        <div className={styles.containerOuter}>
            <h1 className={styles.title}>
                <span className={styles.titlePink}>Create a new form</span>
            </h1>
            <div className={styles.containerInner}>

                <ModalOptions opened={opened} setOpened={setOpened} form={form} index={currentOptionIndex} />

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
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <ButtonInput onAddInput={onAddInput} />
                            </div>
                            <Stack spacing='xs'>
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                                >
                                    <SortableContext
                                        items={form.values.inputs.map(i => i.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {form.values.inputs?.map((input, i) => <InputComponent key={input.id} blocInput={input} form={form.getInputProps(`inputs.${i}.name`)} listIndex={i} setCurrentOptionIndex={setCurrentOptionIndex} onDeleteInput={onDeleteInput} setOpened={setOpened} />)}
                                    </SortableContext>
                                </DndContext>
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


function InputComponent({ blocInput, form, listIndex, setCurrentOptionIndex, onDeleteInput, setOpened }: BlocInputParams & { form?: any, listIndex: number, setCurrentOptionIndex: (v: number) => void, onDeleteInput: (index: number) => void, setOpened: (bool: boolean) => void }) {
    const id = blocInput.id + blocInput.name

    const { setNodeRef, attributes, listeners, transition, transform } = useSortable({ id: blocInput.id })

    const toCapitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
    const getColor = (type: string | 'text' | 'select') => {
        switch (type) {
            case 'text': return 'cyan'
            case 'select': return 'violet'
            default: return 'blue'
        }
    }


    const onEdit = () => {
        setCurrentOptionIndex(listIndex)
        setOpened(true)
    }

    const menu = <Menu shadow="md" width={160} withArrow>
        <Menu.Target>
            <ActionIcon variant='light' size='lg' color='blue' ><IconDotsVertical size={16} /></ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
            <Menu.Label sx={{ textAlign: 'center' }}>
                <Badge color={getColor(blocInput.type)} radius="sm" sx={{ width: '100%' }}>{toCapitalize(blocInput.type)}</Badge>
            </Menu.Label>

            {blocInput.type === 'select' && <Menu.Item icon={<IconEdit size={14} />} onClick={onEdit}>Options</Menu.Item>}
            <Menu.Divider />
            <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => onDeleteInput(listIndex)}>Delete</Menu.Item>
        </Menu.Dropdown>
    </Menu>

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div  ref={setNodeRef} {...attributes}  style={{ display: 'flex', gap: 6, alignItems: 'center', ...style }}>
            <ActionIcon {...listeners}  variant='transparent' size='lg' color='blue'><IconGripVertical size={16} /></ActionIcon>


            <Badge color={getColor(blocInput.type)} radius="sm" sx={{ minWidth: 70, height: 36 }}>{toCapitalize(blocInput.type)}</Badge>
            <Input variant="filled" id={id} placeholder="Label de l'input" {...form} />
            <Checkbox sx={{ marginLeft: 12 }} label="Required" />
            <div style={{ marginLeft: 'auto' }}>
                {menu}
            </div>
        </div>
    )
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