import { Input, Select, Card, Stack, Alert, Button } from "@mantine/core"
import { BlocInput, Bloc, BlocInputTypeOption } from "@prisma/client"
import { IconAlertCircle } from "@tabler/icons"


type BlocParams = Bloc & {
    inputs: (BlocInput & {
        options: BlocInputTypeOption[]
    })[]
}

type BlocInputParams = {
    blocInput: BlocInput & {
        options: BlocInputTypeOption[]
    }
}

export default function BlocComponent(bloc: BlocParams) {

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder sx={{ width: 350 }}>
            <h2>{bloc.title}</h2>
            <Stack>

                {bloc.description && <Alert icon={<IconAlertCircle size={16} />}>{bloc.description}</Alert>}

                {bloc.inputs.map((input, i) => (
                    <InputComponent key={i} blocInput={input} />
                ))}

                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    Ajouter
                </Button>
            </Stack>
        </Card >
    )
}


function InputComponent({ blocInput }: BlocInputParams) {

    switch (blocInput.type) {
        case 'text':
            return <Input variant="filled" placeholder={blocInput.name} />

        case 'select':
            return <Select label={blocInput.name} placeholder="Choisir" data={blocInput.options} />

        default:
            return <></>
    }
}