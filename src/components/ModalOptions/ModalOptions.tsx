import React from 'react'
import { ActionIcon, Button, Group, Input, Modal, ScrollArea, Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form/lib/types'
import { IconPlaylistAdd, IconTrash } from '@tabler/icons'
import { BlocParams } from '../BlocComponent'

type Props = {
    opened: boolean
    setOpened: (opened: boolean) => void
    form: UseFormReturnType<BlocParams>
    index: number
}

function getRandomNumber() {
    return Math.floor(Math.random() * 1000000)
}

export default function ModalOptions({ opened, setOpened, form, index }: Props) {

    function handleNewOption() {
        const newOption = {
            id: getRandomNumber(),
            value: 'Default',
            label: 'Default',
            blocInputId: form.values.inputs[index]?.id,
        }
        form.insertListItem(`inputs.${index}.options`, newOption)
    }

    function handleDeleteOption(optIndex: number) {
        console.log(optIndex, form.values.inputs[index]?.options)
        form.removeListItem(`inputs.${index}.options`, optIndex)
    }

    return (
        <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Ajouter des options"
        >
            <ScrollArea style={{ height: 250, marginBottom: 12 }} >
                <Stack>
                    {form.values.inputs[index]?.options.map((input, i) => (<InputClearable key={i} index={i} handleDeleteOption={handleDeleteOption} form={form.getInputProps(`inputs.${index}.options.${i}.value`)} />))}
                </Stack>
            </ScrollArea>
            <Group position='right' spacing='xs'>
                <Button leftIcon={<IconPlaylistAdd />} variant='outline' onClick={handleNewOption}>Ajouter</Button>
                <Button variant='gradient'>Enregistrer</Button>
            </Group>
        </Modal>
    )
}

function InputClearable({ index, handleDeleteOption, form }: { index: number, handleDeleteOption: (index: number) => void, form: any }) {
    return (
        <Group sx={{ gap: 4 }}>
            <ActionIcon variant='light' color='red' size='lg' onClick={() => handleDeleteOption(index)}><IconTrash size={14} /></ActionIcon>
            <Input variant="filled" placeholder="Label de l'input" {...form} />
        </Group>
    )
}