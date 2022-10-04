import { Input, Select, Card, Stack, Alert, Button } from "@mantine/core"
import { BlocInput, Bloc, BlocInputTypeOption } from "@prisma/client"
import { IconAlertCircle } from "@tabler/icons"


export type BlocParams = Bloc & {
    inputs: (BlocInput & {
        options: BlocInputTypeOption[]
    })[]
}

export type BlocInputParams = {
    blocInput: BlocInput & {
        options: BlocInputTypeOption[]
    }
}

export default function BlocComponent(bloc: BlocParams) {

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <h2>{bloc.title}</h2>
            <Stack>

                {bloc.description && <Alert icon={<IconAlertCircle size={16} />}>{bloc.description}</Alert>}

                {bloc.inputs.map((input, i) => (
                    <InputComponent key={i} blocInput={input} showLabel />
                ))}

                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    Ajouter
                </Button>
            </Stack>
        </Card >
    )
}


export function InputComponent({ blocInput, showLabel }: BlocInputParams & { showLabel?: boolean }) {
    const id = blocInput.id + blocInput.name
    switch (blocInput.type) {
        case 'text':
            return showLabel ? <Input.Wrapper id={id} label={blocInput.name}>
                <Input variant="filled" id={id} />
            </Input.Wrapper> : <Input variant="filled" id={id} />

        case 'select':
            return <Select label={blocInput.name} placeholder="Choisir" data={blocInput.options} />

        default:
            return <></>
    }
}