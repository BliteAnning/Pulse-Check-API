# Dead man's switch API

## Overview of the Project
This system implements a dead man's switch API which detects whether a monitoring device is active or not.

## Problem
CritMon provides monitoring for remote solar farms and unmanned weather stations in areas with poor connectivity. These devices are supposed to send "I'm alive" signals every hour. Currently, CritMon has no way of knowing if a device has gone offline (due to power failure or theft) until a human manually checks the logs. They need a system that alerts them when a device stops talking.

## Solution
This API allows devices to register monitors and send heartbeats. A timer tracks device activity and triggers alerts when devices stop communicating.

## System Architecture
flowchart TD
```mermaid
Device --> API
API --> TimerService
API --> Database
TimerService --> AlertSystem
AlertSystem --> AlertLogs

```

## Sequence Diagram
```mermaid
sequenceDiagram
    participant Device
    participant API_Server
    participant Timer_Manager
    participant Alert_System

    Device->>API_Server: POST /monitors
    API_Server->>Timer_Manager: Start Timer
    API_Server-->>Device: 201 Created

    Device->>API_Server: POST /heartbeat
    API_Server->>Timer_Manager: Reset Timer
    API_Server-->>Device: 200 OK

    Note over API_Server,Timer_Manager: No heartbeat received

    Timer_Manager-->>API_Server: Timer expires
    API_Server->>Alert_System: Trigger alert
    Alert_System-->>API_Server: Log device down
```