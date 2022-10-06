import { ActionIcon, Button, Group, Input, Modal, ScrollArea, Stack } from '@mantine/core'
import { GetInputProps, GetInputPropsType, LooseKeys, UseFormReturnType } from '@mantine/form/lib/types'
import { IconPlaylistAdd, IconTrash } from '@tabler/icons'
import React, { useState } from 'react'
import { BlocParams } from '../BlocComponent'

type Props = {
    opened: boolean
    setOpened: (opened: boolean) => void
    form: UseFormReturnType<BlocParams>
    index: number
}

export default function ModalOptions({ opened, setOpened, form, index }: Props) {
    console.log('form', form)


    return (
        <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Ajouter des options"
        >
            <ScrollArea style={{ height: 250, marginBottom: 12 }} >
                <Stack>
                    {form.values.inputs[index]?.options.map((input, i) => (<InputClearable key={i} form={form.getInputProps(`inputs.${index}.options.${i}.value`)} />))}
                </Stack>
            </ScrollArea>
            <Group position='right' spacing='xs'>
                <Button leftIcon={<IconPlaylistAdd />} variant='outline'>Ajouter</Button>
                <Button variant='gradient'>Enregistrer</Button>
            </Group>
        </Modal>
    )
}

function InputClearable({ form }: { form: any }) {
    return (
        <Group sx={{ gap: 4 }}>
            <ActionIcon variant='light' color='red' size='lg'><IconTrash size={14} /></ActionIcon>
            <Input variant="filled" placeholder="Label de l'input" {...form} />
        </Group>
    )
}