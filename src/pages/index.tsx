import { useTheme } from "@emotion/react"
import { Input, Select, Card, Button, Stack, Alert, useMantineTheme, SimpleGrid } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons"
import Head from "next/head"
import { trpc } from "../utils/trpc"
import styles from "./index.module.css"
import { BlocInput, Bloc, BlocInputTypeOption } from "@prisma/client"
import BlocComponent from "../components/BlocComponent"

export default function Home() {
  const { data, error, isLoading } = trpc.bloc.getByCode.useQuery({ code: 'FORMULAIRE_INSCRIPTION' })
  const { data: blocTeletravail } = trpc.bloc.getByCode.useQuery({ code: 'FORMULAIRE_TELETRAVAIL' })

  if (error) return <></>
  if (!data) return <></>
  const { id, code, description, inputs, title } = data
  return (
    <>
      <Head>
        <title>React dynamic form</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>
          <h1 className={styles.title}>
            <span className={styles.titlePink}>Dynamic form</span>
          </h1>

          <div>
            <SimpleGrid cols={3}>
              {data && <BlocComponent id={id} code={code} description={description} inputs={inputs} title={title} />}
              {blocTeletravail && <BlocComponent id={blocTeletravail.id} code={blocTeletravail.code} description={blocTeletravail.description} inputs={blocTeletravail.inputs} title={blocTeletravail.title} />}

            </SimpleGrid>
          </div>

        </div>
      </div>
    </>
  )
}


